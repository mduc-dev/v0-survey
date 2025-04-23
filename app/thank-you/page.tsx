import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mx-auto max-w-md text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold tracking-tight mb-2">Thank You!</h1>
        <p className="text-gray-500 mb-6">Your survey has been submitted successfully. We appreciate your feedback!</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  )
}
