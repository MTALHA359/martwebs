// src/app/api/wishlist/add/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";

import Wishlist from "@/models/Wishlist";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();
  const { productId } = await req.json();

  try {
    const existing = await Wishlist.findOne({
      user: session.user.id,
      product: productId,
    });
    if (!existing) {
      await Wishlist.create({ user: session.user.id, product: productId });
    }

    return NextResponse.json({ message: "Added to wishlist" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
