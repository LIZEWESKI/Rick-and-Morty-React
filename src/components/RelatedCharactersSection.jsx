import { Link, useLocation } from "react-router-dom"
import { Users, MapPin } from "lucide-react"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const RelatedCharactersSection = ({ data }) => {
  const { characterData, epCharacters, residents } = data
  const location = useLocation()
  const spState = location.state?.sp || ""

  const relatedCategories = [
    {
      id: "episodes",
      label: "Appears in Same Episodes",
      characters: epCharacters,
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "residents",
      label: `Residents of ${characterData.locationName || "the Same Location"}`,
      characters: residents,
      icon: <MapPin className="h-5 w-5" />,
    },
  ]

  return (
    <div className="space-y-4">
      {relatedCategories.map(
        (category) =>
          category.characters.length > 0 && (
            <section key={category.id}>
              <div className="mb-6 flex items-center justify-start gap-2">
                {category.icon}
                <h2 className="text-2xl font-bold tracking-tight">{category.label}</h2>
              </div>
              <CharacterCarousel characters={category.characters} spState={spState} />
            </section>
          ),
      )}
    </div>
  )
}

const CharacterCarousel = ({ characters, spState }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: characters.length > 5,
      }}
      className="mx-auto w-full max-w-5xl"
    >
      <CarouselContent>
        {characters.map((character) => (
          <CarouselItem key={character.id} className="basis-1/2 md:basis-1/5 lg:basis-1/6">
            <Link
              to={`/characters/${character.id}`}
              state={{ sp: spState }}
              className="block transition-transform hover:scale-105"
            >
              <div className="flex flex-col items-center gap-2 p-1">
                <div className="overflow-hidden rounded-full border-2 border-primary/20 p-1">
                  <img
                    src={character.image || "/placeholder.svg"}
                    alt={character.name}
                    loading="lazy"
                    className="aspect-square h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
                  />
                </div>
                <h3 className="line-clamp-1 max-w-full text-center text-sm font-medium">{character.name}</h3>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-2 pt-4">
        <CarouselPrevious className="relative inset-auto translate-y-0 cursor-pointer" />
        <CarouselNext className="relative inset-auto translate-y-0 cursor-pointer" />
      </div>
    </Carousel>
  )
}

export default RelatedCharactersSection

