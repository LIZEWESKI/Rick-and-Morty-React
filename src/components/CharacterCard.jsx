import { useContext } from "react"
import { Link } from "react-router-dom"
import { SpContext } from "../pages/Characters"
import { MapPin, ExternalLink } from "lucide-react"
import capitalizeFirstLetter from "../utils/capitalFirstLetter"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const CharacterCard = ({ character }) => {
    const spState = useContext(SpContext) || ""
    const statusVariant ={
        alive: "success",
        dead: "destructive",
        unknown: "secondary",
    }[character.status.toLowerCase()] || "secondary"

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md py-2 pt-0 gap-2.5">
      <div className="aspect-[4/4] overflow-hidden">
        <Link to={`./${character.id}`} state={{ sp: spState }}>
          <img
            src={character.image || "/placeholder.svg"}
            alt={`${character.name}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </Link>
      </div>

      <CardHeader className="px-4 pb-0">
        <div className="space-y-1">
          <Link to={`./${character.id}`} state={{ sp: spState }} className=" transition-all duration-300 inline-block hover:text-primary">
            <h2 className="line-clamp-1 text-xl font-bold">{character.name}</h2>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant={statusVariant} className="px-2 py-0">
              {capitalizeFirstLetter(character.status)}
            </Badge>
            <span className="text-sm text-muted-foreground">{character.species}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pt-3">
        <div className="space-y-1">
          <div className="text-xs font-medium uppercase text-muted-foreground">Last known location</div>
          <div className="flex items-start gap-1.5">
            <MapPin className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
            <span className="line-clamp-1 text-sm">{capitalizeFirstLetter(character.location.name)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto">
        <Button asChild variant="secondary" className="w-full gap-1.5">
          <Link to={`./${character.id}`} state={{ sp: spState }}>
            View Details
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CharacterCard

