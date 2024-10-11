import { NextResponse } from 'next/server'
import Bull from 'bull';

export const discordQueue = new Bull('discord-queue', process.env.REDIS_URL || "redis://localhost:6379");

export default async function POST() {
  // Send the WA
  await discordQueue.add({})

  return NextResponse.json({ msg: 'Mail sent' })
}