import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, response: NextResponse) {
  //connect to db
  //CRUD database
  //return response
  //return await fetch("https://localhost:8000/api/songs.mp3");
  const url = new URL(req.url);
  const audioFile = new URLSearchParams(url.search).get("audio");
  return await fetch(`${process.env.NEXT_PUBLIC_AUDIO_URL}/${audioFile}.mp3`);
}
