import { connectDB } from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return Response.json({ message: "Not Authenticated" }, { status: 401 });

  const { productId } = await req.json();
  await connectDB();

  await Wishlist.updateOne(
    { userId: session.user._id },
    { $pull: { products: { productId } } }
  );

  return Response.json({ success: true });
}
