import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    // Write data
    await addDoc(collection(db, "test"), {
      message: "Hello Firebase 🚀",
      timestamp: new Date(),
    });

    // Read data
    const querySnapshot = await getDocs(collection(db, "test"));

    const data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}