import { createContext, Suspense } from "react"
import { defer, useLoaderData, useSearchParams, Await } from "react-router-dom"
import { charactersLoader } from "../utils/api"
import { Sparkles, AlertCircle } from "lucide-react"
import FilterComponent from "../components/FilterComponent"
import CharactersGrid from "../components/CharactersGrid"
import CharactersPagination from "../components/Pagination"
import ScrollToTopButton from "../components/ScrollToTopButton"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export function loader({ request }) {
  const urlSP = new URL(request.url).searchParams
  const spObject = Object.fromEntries(urlSP?.entries())
  const charactersPromise = charactersLoader(spObject || "")
  return defer({ charactersData: charactersPromise })
}

export const SpContext = createContext(null)

const Characters = () => {
  const charactersPromise = useLoaderData()
  const [sp, setSp] = useSearchParams()

  function renderCharacters(characterData) {
    return characterData.results.length === 0 ? (
      <NoDataFound feedbackMessage={characterData.message} />
    ) : (
      <>
        <SpContext.Provider value={sp?.toString() || ""}>
          <CharactersGrid characterData={characterData} />
        </SpContext.Provider>
        {characterData.info.pages !== 1 && <CharactersPagination info={characterData.info} />}
      </>
    )
  }

  return (
    <main className="container mx-auto p-12 md:p-8">
      <div className="mb-8 flex flex-col items-center justify-center space-y-2 text-center">
        <Badge variant="outline" className="mb-2">
          <Sparkles className="mr-1 h-3 w-3" />
          <span>Multiverse Database</span>
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Characters Cards</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Browse all characters from the Rick and Morty multiverse. Use the filters to find your favorites.
        </p>
      </div>

      <FilterComponent />

      <Suspense fallback={<LoadingFallback />}>
        <Await resolve={charactersPromise.charactersData}>
          {(charactersData) => renderCharacters(charactersData.data)}
        </Await>
      </Suspense>

      <ScrollToTopButton />
    </main>
  )
}

const NoDataFound = ({ feedbackMessage }) => {
  return (
    <div className="my-20 flex flex-col items-center justify-center space-y-4 text-center">
      <div className="rounded-full bg-muted p-4">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold">{feedbackMessage || "No characters found"}</h2>
      <p className="max-w-md text-muted-foreground">
        Try adjusting your filters or search criteria. There might be characters in another dimension!
      </p>
    </div>
  )
}

const LoadingFallback = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array(8)
        .fill()
        .map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border bg-card">
            <Skeleton className="h-[300px]" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
    </div>
  )
}

export default Characters
