import express from "express";
import { tavily } from "@tavily/core";
import "dotenv/config";
import { system_prompt, prompt_template } from "./prompt";
import { prisma } from "./db";
import { middleware } from "./middleware";
import cors from "cors";
import Groq from "groq-sdk";

const client = tavily({
  apiKey: process.env.tavily_api_key,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.json({
    status: "ok",
    service: "Fast Search Backend",
  });
});

app.get("/Conversations", middleware, async (req, res) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        userId: req.userId,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json(conversations);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch conversations",
    });
  }
});

app.post("/fast_search_ask", middleware, async (req, res) => {
  try {
    const query: string = req.body.query;
    const conversationId: string | undefined = req.body.conversationId;

    if (!query) {
      res.status(400).json({
        message: "Query is required",
      });
      return;
    }

    const web_search_response = await client.search(query, {
      searchDepth: "advanced",
    });

    const web_search_results = web_search_response.results;

    const prompt = prompt_template
      .replace(
        "{{WEB_SEARCH_RESULTS}}",
        web_search_results.map((r) => r.content).join("\n\n")
      )
      .replace("{{USER_QUERY}}", query);

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: system_prompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const finaltext =
      completion.choices[0]?.message?.content || "";

    let activeConversationId = conversationId;

    if (activeConversationId) {
      const conv = await prisma.conversation.findFirst({
        where: {
          id: activeConversationId,
          userId: req.userId,
        },
      });

      if (!conv) {
        activeConversationId = undefined;
      }
    }

    if (!activeConversationId) {
      const slug = query
        .slice(0, 80)
        .replace(/\s+/g, "-")
        .toLowerCase();

      const conv = await prisma.conversation.create({
        data: {
          title: query.slice(0, 100),
          slug,
          userId: req.userId,
        },
      });

      activeConversationId = conv.id;
    }

    await prisma.message.createMany({
      data: [
        {
          content: query,
          role: "User",
          conversationId: activeConversationId,
        },
        {
          content: finaltext,
          role: "Assistant",
          conversationId: activeConversationId,
        },
      ],
    });

    res.json({
      answer: finaltext,
      sources: web_search_results.map((result) => ({
        url: result.url,
      })),
      conversationId: activeConversationId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to process search request",
    });
  }
});

app.get(
  "/Conversation/:conversationId",
  middleware,
  async (req, res) => {
    try {
      const conversation = await prisma.conversation.findFirst({
        where: {
          id: req.params.conversationId as string,
          userId: req.userId,
        },
        include: {
          messages: true,
        },
      });

      if (!conversation) {
        res.status(404).json({
          message: "Conversation not found",
        });
        return;
      }

      res.json(conversation);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to fetch conversation",
      });
    }
  }
);

app.post(
  "/Conversation/follow_up",
  middleware,
  async (req, res) => {
    try {
      const {
        conversationId,
        query,
      }: {
        conversationId: string;
        query: string;
      } = req.body;

      if (!query) {
        res.status(400).json({
          message: "Query is required",
        });
        return;
      }

      const conversation =
        await prisma.conversation.findFirst({
          where: {
            id: conversationId,
            userId: req.userId,
          },
        });

      if (!conversation) {
        res.status(404).json({
          message: "Conversation not found",
        });
        return;
      }

      const web_search_response = await client.search(query, {
        searchDepth: "advanced",
      });

      const web_search_results =
        web_search_response.results;

      const prompt = prompt_template
        .replace(
          "{{WEB_SEARCH_RESULTS}}",
          web_search_results
            .map((r) => r.content)
            .join("\n\n")
        )
        .replace("{{USER_QUERY}}", query);

      const completion =
        await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: system_prompt,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          model: "llama-3.3-70b-versatile",
        });

      const finaltext =
        completion.choices[0]?.message?.content || "";

      await prisma.message.createMany({
        data: [
          {
            content: query,
            role: "User",
            conversationId,
          },
          {
            content: finaltext,
            role: "Assistant",
            conversationId,
          },
        ],
      });

      res.json({
        answer: finaltext,
        sources: web_search_results.map((r) => ({
          url: r.url,
        })),
        conversationId,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to process follow-up request",
      });
    }
  }
);

app.listen(3001, () => {
  console.log("🚀 Fast Search Backend running on port 3001");
});