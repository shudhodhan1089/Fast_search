import express from "express";
import {tavily} from "@tavily/core";
import {streamText,Output} from "ai";
import 'dotenv/config';
import { system_prompt } from "./prompt";
import { prompt_template } from "./prompt";
import { json } from "node:stream/consumers";
import * as z from "zod";
import { create } from "node:domain";
import { createGroq } from "@ai-sdk/groq"; 
import Groq from "groq-sdk";
import { resourceUsage } from "node:process";
import { prisma } from "./db";
import { middleware } from "./middleware";
import cors from "cors";
const client = tavily({apiKey : process.env.tavily_api_key});
const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

const app = express();

app.use(express.json());
app.use(cors());
// app.get("/",(req,res)=>{res.send("Backend Running");});
app.get("/Conversations",middleware,async(req, res)=>{
  res.json({
    userId: req.userId
  })
})

app.post("/fast_search_ask",middleware, async(req,res)=>{
    //here we are going to make a listening and asnwering tool for the projects 
    const query = req.body.query; 
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
  res.write(finaltext);
  res.write("\n\n-------Sources-------\n");

  res.write(JSON.stringify(web_search_results.map(completion=>({url:completion.url}))));
  res.end();



});
app.post("/Conversation/:conversationId",middleware,async(req,res)=>{
  prisma.conversation.findFirst({
    where: {
      id: req.params.conversationId
    }
  })
})
app.post("/Conversation/follow_up",middleware,async(req,res)=>{
  //follow up from the database called supabase
})
app.listen(3001);



