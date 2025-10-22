// src/app/api/send

import { sendItineraryEmail } from "@/app/lib/sendEmail"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { email } = await request.json()

  try {
    await sendItineraryEmail(email)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.log("Error al enviar el email: ", error)
    return NextResponse.json({ success: false, error })
  }

}