import { Link } from "react-router-dom"
import { ExternalLink, Info, Copyright, Heart, Github } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const About = () => {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col items-center justify-center space-y-2 text-center">
        <Badge variant="outline" className="mb-2">
          <Info className="mr-1 h-3 w-3" />
          <span>Project Information</span>
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">About & Credits</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Learn more about this project, its creator, and the resources that made it possible.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-2xl">The Rick and Morty Multiverse Cards</CardTitle>
            <CardDescription>A multiverse of characters at your fingertips</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Welcome to Multiverse Cards, created by Lizeweski during a particularly productive dimension-hopping
              adventure. Legend has it that Lizeweski built this entire project while hiding from the Galactic
              Federation in a pocket dimension where time moves at 1/100th the normal rate. This interactive portal into
              the Rick and Morty multiverse lets you explore characters from infinite realities—all without the side
              effects of actual interdimensional travel!
            </p>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
            "The universe is basically an animal. It grazes on the ordinary. It creates infinite idiots just to eat
            them." - Rick Sanchez
            </blockquote>
            <p>
              
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Copyright className="h-5 w-5" />
              Copyright & Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="api">
                <AccordionTrigger>
                  <div className="flex items-center gap-2 text-left">
                    <span>The Rick and Morty API</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 pl-10">
                  <p>
                    The data and images used in this project are sourced from The Rick and Morty API. We acknowledge
                    that all data and images belong to their respective owners and are used without claim of ownership.
                  </p>
                  <Button asChild variant="outline" size="sm" className="gap-1">
                    <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer">
                      Visit Rick and Morty API
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tvdb">
                <AccordionTrigger>
                  <div className="flex items-center gap-2 text-left">
                    <span>TheTVDB</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 pl-10">
                  <p>
                    Rick and Morty artworks used in this project are sourced from TheTVDB. Their contribution to the
                    visual design and aesthetic of our project is greatly appreciated.
                  </p>
                  <Button asChild variant="outline" size="sm" className="gap-1">
                    <a href="https://www.thetvdb.com/" target="_blank" rel="noopener noreferrer">
                      Visit TheTVDB
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="disclaimer">
                <AccordionTrigger>
                  <div className="flex items-center gap-2 text-left">
                    <span>Disclaimer</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-10">
                  <p>
                    All trademarks, logos, and images are the property of their respective owners. Rick and Morty is
                    created by Justin Roiland and Dan Harmon for Adult Swim. This is a fan project and is not affiliated
                    with Adult Swim, Cartoon Network, or Warner Bros. Entertainment.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Technologies Used</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2">
              {[
                "React & React Router",
                "Tailwind CSS",
                "shadcn/ui Components",
                "Rick and Morty API",
                "Lucide React Icons",
              ].map((tech, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <a href="https://github.com/LIZEWESKI/Rick-nd-Morty" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub Repository
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link to="/characters">
                <Heart className="h-4 w-4" />
                Explore Characters
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default About

