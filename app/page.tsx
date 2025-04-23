import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  if (userId) redirect("/survey");

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-xl">Survey Website</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Share Your Feedback
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Help us improve by completing our short survey. Your input is
                  valuable to us.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/sign-in">
                  <Button
                    className="px-8 bg-black text-white hover:bg-gray-800 hover:scale-105 transition-transform duration-200"
                    aria-label="Start the survey"
                  >
                    Get Started{" "}
                    <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Survey Website. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
