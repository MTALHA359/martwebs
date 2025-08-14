import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file)
    return NextResponse.json({ error: "No file found" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "martverse" }, (err, result) => {
        if (err) reject(err);
        resolve(result);
      })
      .end(buffer);
  });

  return NextResponse.json({ url: result.secure_url });
}
