import { Session } from "next-auth";

interface CustomSession extends Session {
    token: string;
}
