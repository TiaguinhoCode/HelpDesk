// Framework - Servidor
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";

// Tipagem
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(nextAuthOptions);
    if (session) {
        res.status(200).json(session);
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}
