import { Suspense, useEffect, useRef } from "react"
import { useLoaderData, defer, Await, useLocation } from "react-router-dom"
import { characterLoader, episodeLoader, locationLoader } from "../utils/api"
import { Sparkles } from "lucide-react"

import CharacterDetailsCard from "../components/CharacterDetailsCard"
import RelatedCharactersSection from "../components/RelatedCharactersSection"
import BreadCrumbs from "../components/BreadCrumbs"
import ScrollToTopButton from "../components/ScrollToTop"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

import convertURLtoIds from "../utils/convertsURLtoIds"
import renameFields from "../utils/renamingFields"

export function loader({ params }) {
  const { id } = params

  // First fetch: Get the character
  const characterPromise = characterLoader(Number(id)).then((getCharacter) => {
    // Second fetch: Get the episode based on character's episode data
    const firstEpisodeURL = getCharacter.data.episode[0]
    const episodeId = convertURLtoIds(firstEpisodeURL, false, null)

    return episodeLoader(episodeId).then((getEpisode) => {
      // Third fetch: Get the location based on character's location data
      const locationURL = getCharacter.data.location.url
      const locationId = convertURLtoIds(locationURL, false, null)

      return locationLoader(locationId).then((getLocation) => {
        // Field mappings
        const characterFieldMap = {
          episode: "episodes",
        }
        const episodeFieldMap = {
          id: "episodeId",
          name: "episodeName",
          characters: "epCharacters",
        }
        const locationFieldMap = {
          id: "locationId",
          name: "locationName",
          type: "locationType",
        }

        // Rename fields
        const transformedCharacterData = renameFields(getCharacter.data, characterFieldMap)
        const transformedEpisodeData = renameFields(getEpisode.data, episodeFieldMap)
        const transformedLocationData = renameFields(getLocation.data, locationFieldMap)

        // Fetch related characters
        const locationResidentsArrayURLs = getLocation.data.residents
        const epCharactersArrayURLs = getEpisode.data.characters

        const residentsIds = convertURLtoIds(locationResidentsArrayURLs, true, id)
        const epCharactersIds = convertURLtoIds(epCharactersArrayURLs, true, id)

        // Fetch related characters asynchronously
        const residentsPromise = characterLoader(residentsIds)
        const epCharactersPromise = characterLoader(epCharactersIds)

        return Promise.all([residentsPromise, epCharactersPromise]).then(([residents, epCharacters]) => {
          // Organize data
          const data = {
            characterData: {
              ...transformedCharacterData,
              ...transformedEpisodeData,
              ...transformedLocationData,
            },
            residents: Array.isArray(residents.data) ? [...residents.data] : [residents.data],
            epCharacters: Array.isArray(epCharacters.data) ? epCharacters.data : [epCharacters.data],
          }
          return data
        })
      })
    })
  })

  // Use defer to return promises
  return defer({
    characterDetails: characterPromise,
  })
}

const CharacterDetails = () => {
  const characterPromise = useLoaderData()
  const scrollRef = useRef(0); 
  const location = useLocation(); 

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, [location.pathname]); 

  useEffect(() => {
    return () => {
      scrollRef.current = window.scrollY;
    };
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-background pb-16">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-8 flex flex-col items-center justify-center">
          <Badge variant="outline" className="mb-2">
            <Sparkles className="mr-1 h-3 w-3" />
            <span>Character Profile</span>
          </Badge>
        </div>


        <Suspense fallback={<CharacterDetailsSkeleton />}>
          <Await resolve={characterPromise.characterDetails}>
            {(characterDetails) => (
              <>
              <BreadCrumbs currentPath={characterDetails.characterData.name}/>
                <CharacterDetailsCard characterData={characterDetails.characterData} />
                <RelatedCharactersSection data={characterDetails} />
              </>
            )}
          </Await>
        </Suspense>
      </div>
      <ScrollToTopButton />
    </main>
  )
}

const CharacterDetailsSkeleton = () => {
  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-3xl rounded-xl border bg-card/30 p-6 backdrop-blur">
        <div className="flex flex-col gap-6 md:flex-row">
          <Skeleton className="mx-auto aspect-square h-[300px] w-[300px] rounded-xl" />

          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="flex gap-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32 w-32 shrink-0 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CharacterDetails

