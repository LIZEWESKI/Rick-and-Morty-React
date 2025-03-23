import { Link, useRouteError } from "react-router-dom"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

const ErrorElement = () => {
  const error = useRouteError()
  const errorMessage = error?.message || "Sorry folks, um technical difficulties..."

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full bg-destructive/20 blur-sm" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-destructive bg-card">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold sm:text-3xl">{errorMessage}</h1>

        <p className="mb-8 text-muted-foreground">
          Looks like the portal gun malfunctioned. The Council of Ricks has been notified and they're working on it. Try
          again later or return home.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="default" size="lg" className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>

          <Button variant="outline" size="lg" className="gap-2" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>

        <div className="mt-8 rounded-lg border border-border/50 bg-card/30 p-4 backdrop-blur">
          <p className="text-sm text-muted-foreground">
            <strong>Error details:</strong> {error?.stack ? error.stack.split("\n")[0] : "Unknown error"}
          </p>
        </div>
      </div>
    </main>
  )
}

export default ErrorElement

