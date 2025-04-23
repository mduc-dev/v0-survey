"use client";

import { redirect } from "next/navigation";
import SurveyForm from "@/components/survey-form";
import { useUser } from "@clerk/nextjs";
import { LoadingSpinner } from "@/components/ui/spinner";

export default function SurveyPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <LoadingSpinner />;

  if (!user) return redirect("/sign-in");

  const userEmail = user.emailAddresses[0]?.emailAddress || "";
  const userId = user.id;

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Survey Form</h1>
      <SurveyForm userEmail={userEmail} userId={userId} />
    </div>
  );
}
