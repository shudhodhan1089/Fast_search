import express from "express";
import {tavily} from "@tavily/core";
import 'dotenv/config';
import { system_prompt } from "./prompt";
import { prompt_template } from "./prompt";
import { prisma } from "./db";
import { middleware } from "./middleware";
import cors from "cors";
import Groq from "groq-sdk";
const client = tavily({apiKey : process.env.tavily_api_key});
const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

const app = express();

app.use(express.json());
app.use(cors());
// app.get("/",(req,res)=>{res.send("Backend Running");});
app.get("/Conversations",middleware,async(req, res)=>{
  const conversations = await prisma.conversation.findMany({
    where: { userId: req.userId },
    orderBy: { id: "desc" }
  })
  res.json(conversations)
})

app.post("/fast_search_ask",middleware, async(req,res)=>{
    //here we are going to make a listening and asnwering tool for the projects 
    const query: string = req.body.query; 
    const conversationId: string | undefined = req.body.conversationId;
    //web search and context engineering here in this paragraph only right now 
    const web_search_response = await client.search(query, {
    searchDepth: "advanced",
    });
    console.log("Tavily Working");
    const web_search_results =web_search_response.results;
    const prompt = prompt_template
    .replace("{{WEB_SEARCH_RESULTS}}",web_search_results.map(r=>r.content).join("\n\n"))
    .replace("{{USER_QUERY}}",query);
  console.log(query);
  console.log(prompt);
  const completion = await groq.chat.completions.create({
    messages: [
      {
      role : "system",
      content: system_prompt,
      },
      {
        role: "user",
        content:prompt,
      }
    ],
    model: "llama-3.3-70b-versatile",
  });
  res.header("Cache-Control","no-cache");
  res.header("Content-Type","text/plain");
  const finaltext = 
  completion.choices[0]?.message?.content || "";
  console.log(finaltext);

  let activeConversationId = conversationId;
  if (activeConversationId) {
    const conv = await prisma.conversation.findFirst({
      where: { id: activeConversationId, userId: req.userId }
    });
    if (!conv) activeConversationId = undefined;
  }
  if (!activeConversationId) {
    const slug = query.slice(0, 80).replace(/\s+/g, "-").toLowerCase();
    const conv = await prisma.conversation.create({
      data: { title: query.slice(0, 100), slug, userId: req.userId }
    });
    activeConversationId = conv.id;
  }
  await prisma.message.createMany({
    data: [
      { content: query, role: "User", conversationId: activeConversationId },
      { content: finaltext, role: "Assistant", conversationId: activeConversationId }
    ]
  });

  res.write(finaltext);
  res.write("\n\n-------Sources-------\n");

  res.write(JSON.stringify(web_search_results.map(completion=>({url:completion.url}))));
  res.end();



});
app.get("/Conversation/:conversationId",middleware,async(req,res)=>{
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: req.params.conversationId as string,
      userId: req.userId
    },
    include: { messages: true }
  })
  if (!conversation) {
    res.status(404).json({ message: "Conversation not found" })
    return
  }
  res.json(conversation)
})
app.post("/Conversation/follow_up",middleware,async(req,res)=>{
  const { conversationId, query } = req.body as { conversationId: string; query: string }
  const conversation = await prisma.conversation.findFirst({
    where: { id: conversationId, userId: req.userId }
  })
  if (!conversation) {
    res.status(404).json({ message: "Conversation not found" })
    return
  }
  const web_search_response = await client.search(query, { searchDepth: "advanced" })
  const web_search_results = web_search_response.results
  const prompt = prompt_template
    .replace("{{WEB_SEARCH_RESULTS}}", web_search_results.map(r=>r.content).join("\n\n"))
    .replace("{{USER_QUERY}}", query)
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: system_prompt },
      { role: "user", content: prompt }
    ],
    model: "llama-3.3-70b-versatile",
  })
  const finaltext = completion.choices[0]?.message?.content || ""
  await prisma.message.createMany({
    data: [
      { content: query, role: "User", conversationId },
      { content: finaltext, role: "Assistant", conversationId }
    ]
  })
  res.json({
    answer: finaltext,
    sources: web_search_results.map(r=>({url: r.url}))
  })
})
app.listen(3001);



