import { useOutletContext } from "react-router-dom"
import { MapPin, Globe } from "lucide-react"
import capitalizeFirstLetter from "../utils/capitalFirstLetter"

const CharacterDetailsLocation = () => {
  const characterData = useOutletContext()
  const characterOrigin = characterData.origin.name === "unknown" ? "Unknown Origin" : characterData.origin.name
  const characterDimension = characterData.dimension === "unknown" ? "Unknown Dimension" : characterData.dimension

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Globe className="h-4 w-4" />
          <h3 className="text-sm font-medium uppercase">Origin</h3>
        </div>
        <p className="text-xl font-medium">{characterOrigin}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <h3 className="text-sm font-medium uppercase">Current Location</h3>
        </div>
        <p className="text-xl font-medium">{capitalizeFirstLetter(characterData.locationName)}</p>
        <p className="text-sm text-muted-foreground">
          {capitalizeFirstLetter(characterData.locationType)} - {capitalizeFirstLetter(characterDimension)}
        </p>
      </div>
    </div>
  )
}

export default CharacterDetailsLocation

