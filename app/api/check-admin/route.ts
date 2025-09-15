import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("❌ Missing Supabase environment variables");
}

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ success: false, error: "Missing Token" }, { status: 401 });
  }

  const { data, error } = await supabaseServer.auth.getUser(token);

  if (error || !data.user) {
    return NextResponse.json({ success: false, error: "Invalid Token" }, { status: 401 });
  }

  if (data.user.id === process.env.ADMIN_ID) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
  }
}
