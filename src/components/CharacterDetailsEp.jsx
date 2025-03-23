import { useOutletContext } from "react-router-dom"
import { Calendar, Tv } from "lucide-react"

const CharacterDetailsEp = () => {
  const characterData = useOutletContext()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Tv className="h-4 w-4" />
          <h3 className="text-sm font-medium uppercase">First Seen In</h3>
        </div>
        <p className="text-xl font-medium">{characterData.episodeName}</p>
        <p className="text-sm font-medium">{characterData.episode}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <h3 className="text-sm font-medium uppercase">Air Date</h3>
        </div>
        <p className="text-lg">{characterData.air_date}</p>
      </div>
    </div>
  )
}

export default CharacterDetailsEp

