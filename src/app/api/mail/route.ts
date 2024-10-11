import { NextResponse } from 'next/server'
import Bull from 'bull';

export const mailQueue = new Bull('mail-queue', process.env.REDIS_URL || "redis://localhost:6379");


export default async function POST(request: Request) {
  const { email } = await request.json()

  // Send the email
  await mailQueue.add({
    email
  })

  return NextResponse.json({ msg: 'Mail sent' })
}