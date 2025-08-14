import { connectDB } from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return Response.json({ message: "Not Authenticated" }, { status: 401 });

  await connectDB();

  const wishlist = await Wishlist.findOne({
    userId: session.user._id,
  }).populate("products.productId");

  return Response.json({ wishlist });
}
