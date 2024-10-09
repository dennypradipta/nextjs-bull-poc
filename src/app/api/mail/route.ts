"use server"

import { mailQueue } from '@/queues/jobs/mail'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email } = await request.json()

  // Send the email
  mailQueue.add({
    email
  })

  return NextResponse.json({ msg: 'Mail sent' })
}