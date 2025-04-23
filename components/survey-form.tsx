"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { submitSurvey } from "@/app/actions/survey-actions"

const surveyFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  rating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Please select a rating.",
  }),
})

type SurveyFormValues = z.infer<typeof surveyFormSchema>

export default function SurveyForm({ userEmail, userId }: { userEmail: string; userId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<SurveyFormValues>({
    resolver: zodResolver(surveyFormSchema),
    defaultValues: {
      name: "",
      email: userEmail,
      phone: "",
      rating: undefined,
    },
  })

  async function onSubmit(data: SurveyFormValues) {
    setIsSubmitting(true)

    try {
      await submitSurvey({
        ...data,
        userId,
      })

      toast({
        title: "Survey submitted",
        description: "Thank you for your feedback!",
      })

      router.push("/thank-you")
    } catch (error) {
      console.error("Error submitting survey:", error)
      toast({
        title: "Error",
        description: "There was a problem submitting your survey. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Survey</CardTitle>
        <CardDescription>Please provide your feedback by filling out this form.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How would you rate your experience?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <FormItem key={rating} className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={rating.toString()} />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">{rating}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>1 = Poor, 5 = Excellent</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Survey"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
