// import mongoose from "mongoose";

// let isConnected = false;

// export async function connectDB() {
//   if (isConnected) return;

//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: "martverse",
//     });

//     isConnected = true;
//     console.log("✅ MongoDB Connected");
//   } catch (error) {
//     console.log("❌ MongoDB Error:", error);
//   }
// }


// src/lib/db.js
import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI is missing in environment variables");
    return; // Avoid crashing build
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "martverse",
    });
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Error:", error);
  }
}
