import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { FavCharsContext } from "./FavCharsProvider"
import { Trash2, MapPin, Tv, User, Globe, ChevronDown, ChevronUp } from "lucide-react"
import capitalizeFirstLetter from "../utils/capitalFirstLetter"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const FavCharacterCard = ({ character }) => {
  const { id, image, name, status, species, type, gender, origin, location, episodeName, episode } = character

  const [isOpen, setIsOpen] = useState(false)

  // Status badge styling
  const statusVariant =
    {
      alive: "success",
      dead: "destructive",
      unknown: "secondary",
    }[status.toLowerCase()] || "secondary"

  // Delete favorite character
  const { setFavChars } = useContext(FavCharsContext)

  function deleteFavChar(id) {
    setFavChars((prevChar) => prevChar.filter((char) => char.id !== id))
  }

  return (
    <Card className="group overflow-hidden py-0 transition-all hover:border-primary/30 hover:shadow-md">
      <div className="relative">
        <Link to={`/characters/${id}`}>
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="aspect-auto w-full object-cover object-center"
          />
        </Link>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => deleteFavChar(id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove from favorites</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove from favorites</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <CardHeader className="p-4 pb-0">
        <Link to={`/characters/${id}`}>
          <CardTitle className="line-clamp-1 hover:text-primary">{name}</CardTitle>
        </Link>
        <CardDescription className="flex items-center gap-2">
          <Badge variant={statusVariant} className="px-2 py-0">
            {capitalizeFirstLetter(status)}
          </Badge>
          <span>{capitalizeFirstLetter(gender)}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="flex items-center gap-1.5 text-sm">
          <User className="h-3.5 w-3.5 text-muted-foreground" />
          <span>
            {species || "Unknown Species"}
            {type ? ` - ${type}` : ""}
          </span>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-2 space-y-2">
          <div className="flex items-center gap-1.5 text-sm">
            <Globe className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="line-clamp-1">
              <span className="text-muted-foreground">Origin:</span> {origin.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-sm">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="line-clamp-1">
              <span className="text-muted-foreground">Location:</span> {location.name}
            </span>
          </div>

          <CollapsibleContent className="space-y-2">
            <div className="flex items-start gap-1.5 text-sm">
              <Tv className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
              <div>
                <span className="text-muted-foreground">First seen in:</span>
                <div className="line-clamp-2">
                  {episodeName} - {episode}
                </div>
              </div>
            </div>
          </CollapsibleContent>

          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex w-full items-center justify-center gap-1 p-0 text-xs font-normal text-muted-foreground hover:text-primary"
            >
              {isOpen ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="h-3 w-3" />
                </>
              ) : (
                <>
                  <span>Show more</span>
                  <ChevronDown className="h-3 w-3" />
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </CardContent>

      <CardFooter className="border-t p-3">
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link to={`/characters/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default FavCharacterCard

