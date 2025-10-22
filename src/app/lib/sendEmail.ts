// src/lib/sendItineraryEmail.ts
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function sendItineraryEmail(to: string) {
  const htmlTemplate = fs.readFileSync(
    path.join(process.cwd(), "templates/index.html"), "utf8")

  // create the transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", //o usa host/port si es otro SPTM
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  })

  //configure the email
  const mailOptions = {
    from: `"Itinerario de vuelo" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Tu itinerario de vuelo esta casi listo!",
    html: htmlTemplate,
    attachments: [
      {
        filename: "logo.png",
        path: path.join(process.cwd(), "public/email-assets/logo.png"),
        cid: "logo",//mismo que el src
      },
      {
        filename: "plane.png",
        path: path.join(process.cwd(), "public/email-assets/plane.png"),
        cid: "plane",//mismo que el src
      },
      {
        filename: "arrow.png",
        path: path.join(process.cwd(), "public/email-assets/arrow.png"),
        cid: "arrow",//mismo que el src
      }
    ]
  }

  //Send
  await transporter.sendMail(mailOptions)
  console.log("Correo enviado a: ", to)
}