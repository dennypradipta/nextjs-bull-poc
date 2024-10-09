"use server"

import { pushNotificationQueue } from '@/queues/jobs/push-notification'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { id } = await request.json()

  // Send the email
  pushNotificationQueue.add({
    id
  })

  return NextResponse.json({ msg: 'Mail sent' })
}