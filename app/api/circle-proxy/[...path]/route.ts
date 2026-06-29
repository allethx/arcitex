import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.circle.com";

async function proxy(
  request: NextRequest,
  path: string[],
) {
  const search =
  request.nextUrl.search;

const url =
  `${BASE_URL}/${path.join("/")}${search}`;
   
console.log("Forward URL");
console.log(url);

  const headers = new Headers();
 
    const kitKey =
  process.env.NEXT_PUBLIC_CIRCLE_KIT_KEY;

if (!kitKey) {
  throw new Error(
    "NEXT_PUBLIC_CIRCLE_KIT_KEY is missing"
  );
}

headers.set(
  "Authorization",
  `Bearer ${kitKey}`
);

  request.headers.forEach(
    (value, key) => {
      const lower =
        key.toLowerCase();

      if (
  lower === "host" ||
  lower === "origin" ||
  lower === "referer" ||
  lower === "connection" ||
  lower === "content-length" ||
  lower === "authorization"
) {
  return;
}

      headers.set(key, value);
    },
  );

 const requestBody =
  request.method === "GET" ||
  request.method === "HEAD"
    ? undefined
    : await request.text();

console.log("================================");
console.log("REQUEST URL:", url);
console.log("REQUEST BODY:");
console.log(requestBody);
 
const auth = headers.get("Authorization");

console.log(
  "Authorization:",
  auth
    ? auth.substring(0, 20) + "..."
    : null
);

const response = await fetch(url, {
  method: request.method,
  headers,
  body: requestBody,
  redirect: "manual",
});

console.log("================================");
console.log("Circle URL:", url);
console.log("Status:", response.status);

const text = await response.clone().text();

console.log("Response Body:");
console.log(text);

try {
  console.dir(JSON.parse(text), {
    depth: null,
  });
} catch {
  console.log(text);
}


 return new NextResponse(text, {
  status: response.status,
  headers: {
    "Content-Type": "application/json",
  },
});
}

async function handler(
  request: NextRequest,
  context: {
    params: Promise<{
      path: string[];
    }>;
  },
) {
  const { path } =
    await context.params;

  return proxy(
    request,
    path,
  );
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin":
        "*",
      "Access-Control-Allow-Methods":
        "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers":
        "*",
    },
  });
}