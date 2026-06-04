import type { NextFunction, Request,Response } from "express";
import { createSupabaseClient } from "./client";
import { prisma } from "./db";

const client = createSupabaseClient();

export async function middleware(req: Request,res: Response, next: NextFunction){
    const token = req.headers.authorization;
    const data = await client.auth.getUser(token);
    const userId = data.data.user?.id;
    
    if (userId) {
        try {
            await prisma.user.upsert({
                where: { id: userId },
                update: {},
                create: {
                    id: userId,
                    email: data.data.user?.email ?? "unknown",
                    provider: data.data.user?.app_metadata?.provider === "google" ? "Google" : "Github",
                    name: data.data.user?.user_metadata?.name ?? "Anonymous"
                }
            });
        } catch (e) {
            console.error("[middleware] User upsert failed:", e);
        }
        
        req.userId = userId;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect inputs"
        });
    }
}