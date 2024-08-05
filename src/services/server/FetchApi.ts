import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getData(
  url: string,
  method: string,
  time: number,
  body?: Record<string, any>
) {
  const session = await getServerSession(nextAuthOptions);

  const headers: HeadersInit = {
    Authorization: `Bearer ${session?.user.token}`,
    "Content-Type": "application/json",
  };

  const fetchOptions: RequestInit = {
    method: method,
    headers: headers,
    next: {
      revalidate: time,
    },
  };

  if (method === "POST" && body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const resp = await fetch(
    `https://helpdeskapi.vercel.app/${url}`,
    fetchOptions
  );

  return resp.json();
}
