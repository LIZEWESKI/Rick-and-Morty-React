import { Link } from "react-router-dom"
import { PlugIcon as Portal, Home, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="relative mx-auto max-w-md text-center">
        {/* Portal effect background */}
        <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl" />

        <Badge variant="outline" className="mb-4">
          <Sparkles className="mr-1 h-3 w-3" />
          <span>Wrong Dimension</span>
        </Badge>

        <div className="mb-6 flex items-center justify-center">
          <h1 className="relative text-[10rem] font-extrabold leading-none tracking-tight text-primary">
            <span className="absolute -inset-1 block animate-pulse blur-xl">404</span>
            404
          </h1>
        </div>

        <h2 className="mb-3 text-3xl font-bold tracking-tight">You've entered the wrong dimension</h2>

        <p className="mb-8 text-muted-foreground">
          Aw jeez, Rick! The page you're looking for doesn't exist in this universe. Maybe it's in dimension C-137?
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Return to Home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/characters">
              <Portal className="h-4 w-4" />
              Explore Characters
            </Link>
          </Button>
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            "Sometimes science is more art than science, Morty. A lot of people don't get that."
          </blockquote>
        </div>
      </div>
    </main>
  )
}

export default NotFound

