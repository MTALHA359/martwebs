import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";

export async function GET(req, { params }) {
  await connectDB();
  const product = await Product.findById(params.id);
  return Response.json(product);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();

  const updated = await Product.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}
