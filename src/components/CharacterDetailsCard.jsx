import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FavCharsContext } from "./FavCharsProvider"
import { Heart, MapPin, Tv } from "lucide-react"
import capitalizeFirstLetter from "../utils/capitalFirstLetter"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const CharacterDetailsCard = ({ characterData }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const spState = location.state?.sp || ""
  const [activeTab, setActiveTab] = useState(location.pathname.includes("episode") ? "episode" : "location")

  // Status badge styling
  const statusVariant =
    {
      alive: "success",
      dead: "destructive",
      unknown: "secondary",
    }[characterData.status.toLowerCase()] || "secondary"

  // Favorites functionality
  const { favChars, setFavChars } = useContext(FavCharsContext)
  const isAlreadyFavorite = favChars.some((prevChar) => prevChar.id === characterData.id) || false

  function toggleFavorite() {
    setFavChars((prevChars) => {
      if (isAlreadyFavorite) {
        return prevChars.filter((prevChar) => prevChar.id !== characterData.id)
      } else {
        return [characterData, ...prevChars]
      }
    })
  }

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value)
    // Navigate to the appropriate route
    if (value === "episode" && !location.pathname.includes("episode")) {
      navigate(`${location.pathname}/episode`, { state: { sp: spState } })
    } else if (value === "location" && location.pathname.includes("episode")) {
      navigate(location.pathname.replace("/episode", ""), { state: { sp: spState } })
    }
  }

  return (
    <div className="mx-auto mb-16 max-w-3xl rounded-xl border border-border/50 bg-card/30 backdrop-blur">
      <div className="flex flex-col md:flex-row">
        {/* Character Image */}
        <div className="relative md:mx-0">
          <div className="relative aspect-square h-full w-full max-w-content overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
            <img
              src={characterData.image || "/placeholder.svg"}
              alt={characterData.name}
              className="h-full w-full object-cover"
            />

            {/* Favorite Button */}
            <Button
              variant={isAlreadyFavorite ? "default" : "secondary"}
              size="icon"
              className="absolute right-3 top-3 h-9 w-9 rounded-full shadow-md transition-all hover:scale-110 cursor-pointer"
              onClick={toggleFavorite}
              aria-label={isAlreadyFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-4 w-4 ${isAlreadyFavorite ? "fill-primary-foreground" : "fill-none"}`} />
            </Button>
          </div>
        </div>

        {/* Character Info */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">{characterData.name}</h1>

            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant={statusVariant}>{capitalizeFirstLetter(characterData.status)}</Badge>
              <span className="text-sm text-muted-foreground">{capitalizeFirstLetter(characterData.gender)}</span>
            </div>

            <p className="text-muted-foreground">
              {characterData.species || "Unknown Species"} - {characterData.type || "Unknown Type"}
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue={activeTab} className="flex-1" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="location" className="flex items-center gap-2 cursor-pointer">
                <MapPin className="h-4 w-4" />
                <span>Location</span>
              </TabsTrigger>
              <TabsTrigger value="episode" className="flex items-center gap-2 cursor-pointer">
                <Tv className="h-4 w-4" />
                <span>Episode</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="location" className="mt-4 space-y-4">
              <div className="space-y-1">
                <h3 className="text-xs font-medium uppercase text-muted-foreground">Origin</h3>
                <p className="text-lg font-medium">
                  {characterData.origin.name === "unknown" ? "Unknown Origin" : characterData.origin.name}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-medium uppercase text-muted-foreground">Current Location</h3>
                <p className="text-lg font-medium">{capitalizeFirstLetter(characterData.locationName)}</p>
                <p className="text-sm text-muted-foreground">
                  {capitalizeFirstLetter(characterData.locationType)} -{" "}
                  {characterData.dimension === "unknown"
                    ? "Unknown Dimension"
                    : capitalizeFirstLetter(characterData.dimension)}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="episode" className="mt-4 space-y-4">
              <div className="space-y-1">
                <h3 className="text-xs font-medium uppercase text-muted-foreground">First Seen In</h3>
                <p className="text-lg font-medium">
                  {characterData.episodeName} - {characterData.episode}
                </p>
                <p className="text-sm text-muted-foreground">Air Date: {characterData.air_date}</p>
              </div>

              <div className="mt-4">
                <Badge variant="outline" className="text-xs">
                  Appears in {characterData.episodes.length} episode{characterData.episodes.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default CharacterDetailsCard

