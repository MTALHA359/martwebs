import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json({ message: "Admin created", user: newAdmin });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
