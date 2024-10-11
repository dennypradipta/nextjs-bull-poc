import { NextResponse } from 'next/server'
import Bull from 'bull';

export const pushNotificationQueue = new Bull('push-notification-queue', process.env.REDIS_URL || "redis://localhost:6379");

export default async function POST(request: Request) {
  const { id } = await request.json()

  // Send the email
  pushNotificationQueue.add({
    id
  })

  return NextResponse.json({ msg: 'Mail sent' })
}