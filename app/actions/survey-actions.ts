"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

type SurveyData = {
  name: string
  email: string
  phone: string
  rating: string
  userId: string
}

export async function submitSurvey(data: SurveyData) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("surveys").insert([
    {
      name: data.name,
      email: data.email,
      phone: data.phone,
      rating: Number.parseInt(data.rating),
      user_id: data.userId,
    },
  ])

  if (error) {
    console.error("Error submitting survey:", error)
    throw new Error("Failed to submit survey")
  }

  return { success: true }
}
