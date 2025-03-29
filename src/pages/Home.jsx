import { Link } from "react-router-dom"
import { Sparkles, Users, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col justify-center items-center">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url()`,
          filter: "brightness(0.1)",
        }}
      />
      {/* Animated portal effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-60 animate-pulse" />

      {/* Content */}
      <main className="container relative z-10 flex flex-col items-center justify-center px-4 py-12 text-center md:py-16">
        <Badge variant="outline" className="mb-4 animate-fade-in">
          <Sparkles className="mr-1 h-3 w-3" />
          <span>Wubba Lubba Dub Dub!</span>
        </Badge>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block text-primary">The Rick and Morty</span>
          <span className="block bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            Multiverse Cards
          </span>
        </h1>

        <p className="mb-8 max-w-2xl text-xl text-muted-foreground md:text-2xl">
          Intergalactic chaos, science gone wild! Explore all 137+ dimensions of madness.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2 text-lg">
            <Link to="/characters">
              <Users className="h-5 w-5" />
              Browse Characters
            </Link>
          </Button>

          <Button asChild variant="secondary" size="lg" className="gap-2 text-lg">
            <Link to="/quiz">
              <Brain className="h-5 w-5" />
              Personality Check!
            </Link>
          </Button>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Infinite Characters"
            description="From Mr. Poopybutthole to Pickle Rick, discover them all!"
          />
          <FeatureCard
            title="Dimension Hopping"
            description="Explore the Council of Ricks and beyond with our portal gun."
          />
          <FeatureCard title="Save Favorites" description="Collect your favorite characters across the multiverse." />
        </div>
      </main>
    </div>
  )
}

const FeatureCard = ({ title, description }) => {
  return (
    <div className="rounded-lg border border-border/50 bg-card/30 p-6 backdrop-blur transition-all hover:border-primary/50 hover:bg-card/50">
      <h3 className="mb-2 text-xl font-bold text-card-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export default Home

