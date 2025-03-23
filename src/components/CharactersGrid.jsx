import { useSearchParams } from "react-router-dom"
import CharacterCard from "./CharacterCard"

const CharactersGrid = ({ characterData }) => {
  const { info, results } = characterData
  const totalCharacters = info.count

  return (
    <>
      <CharactersCount totalCharacters={totalCharacters} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center content-center">
        {results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </>
  )
}

function CharactersCount({ totalCharacters }) {
  const [sp] = useSearchParams()
  const currentPage = Number(sp.get("page")) || 1
  const charactersPerPage = 20
  let lastShown = charactersPerPage * currentPage
  const firstShown = lastShown - (charactersPerPage - 1)

  if (lastShown > totalCharacters) lastShown = totalCharacters

  return (
    <div className="mb-4 text-sm text-muted-foreground">
      Showing{" "}
      <span className="font-medium text-foreground">
        {firstShown} - {lastShown}
      </span>{" "}
      of <span className="font-medium text-foreground">{totalCharacters}</span>{" "}
      {totalCharacters === 1 ? "Character" : "Characters"}
    </div>
  )
}

export default CharactersGrid

