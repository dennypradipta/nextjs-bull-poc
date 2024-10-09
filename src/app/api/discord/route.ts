"use server"

import { discordQueue } from '@/queues/jobs/discord'
import { NextResponse } from 'next/server'

export async function POST() {
  // Send the WA
  discordQueue.add({})

  return NextResponse.json({ msg: 'Mail sent' })
}