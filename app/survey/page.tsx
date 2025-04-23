import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import SurveyForm from "@/components/survey-form"

export default async function SurveyPage() {
  const { userId } = auth()
  const user = await currentUser()

  if (!userId || !user) {
    redirect("/sign-in")
  }

  // Pre-fill email from user's Clerk account
  const userEmail = user.emailAddresses[0]?.emailAddress || ""

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Survey Form</h1>
      <SurveyForm userEmail={userEmail} userId={userId} />
    </div>
  )
}
