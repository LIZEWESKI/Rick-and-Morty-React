import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Heart, Search, Sparkles } from "lucide-react"
import FavCharacterCard from "../components/FavCharacterCard"
import { FavCharsContext } from "../components/FavCharsProvider"
import ScrollToTopButton from "../components/ScrollToTopButton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Favorites = () => {
  const { favChars } = useContext(FavCharsContext)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("name")

  // Filter and sort characters
  const filteredChars = React.useMemo(() => {
    return favChars
      .filter((char) => {
        // Apply search filter
        const matchesSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase())

        // Apply status filter
        const matchesStatus = statusFilter === "all" || char.status.toLowerCase() === statusFilter.toLowerCase()

        return matchesSearch && matchesStatus
      })
      .sort((a, b) => {
        // Apply sorting
        if (sortBy === "name") {
          return a.name.localeCompare(b.name)
        } else if (sortBy === "status") {
          return a.status.localeCompare(b.status)
        } else if (sortBy === "species") {
          return a.species.localeCompare(b.species)
        }
        return 0
      })
  }, [favChars, searchTerm, statusFilter, sortBy])

  return (
    <main className="container mx-auto md:px-20 px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-center space-y-2 text-center">
        <Badge variant="outline" className="mb-2">
          <Heart className="mr-1 h-3 w-3 fill-primary text-primary" />
          <span>Collection</span>
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Your Favorite Characters</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Your personal collection of the multiverse's most interesting beings.
        </p>
      </div>

      {favChars.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <>
          <Card className="mb-8 border-border/50 bg-card/95 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Manage Collection</CardTitle>
              <CardDescription>Search, filter, and sort your favorite characters.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="alive">Alive</SelectItem>
                    <SelectItem value="dead">Dead</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="status">Sort by Status</SelectItem>
                    <SelectItem value="species">Sort by Species</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 px-6 py-3">
              <p className="text-sm text-muted-foreground">
                Showing {filteredChars.length} of {favChars.length} characters
              </p>
            </CardFooter>
          </Card>

          {filteredChars.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
              <Search className="mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="mb-2 text-2xl font-semibold">No matches found</h2>
              <p className="mb-6 max-w-md text-muted-foreground">
                No characters match your current filters. Try adjusting your search or filter criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-center items-center">
              {filteredChars.map((character) => (
                <FavCharacterCard key={character.id} character={character} />
              ))}
            </div>
          )}
        </>
      )}

      <ScrollToTopButton />
    </main>
  )
}

const EmptyFavorites = () => {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-dashed border-border p-8 text-center">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Heart className="h-10 w-10 text-muted-foreground" />
      </div>

      <h2 className="mb-3 text-2xl font-bold">No favorites yet</h2>

      <p className="mb-6 text-muted-foreground">
        You haven't added any characters to your favorites collection. Explore the multiverse and start collecting!
      </p>

      <div className="space-y-3">
        <Button asChild className="w-full gap-2">
          <Link to="/characters">
            <Search className="h-4 w-4" />
            Explore Characters
          </Link>
        </Button>

        <p className="text-xs text-muted-foreground">
          Tip: Click the heart icon on any character to add them to your favorites.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm text-muted-foreground">
          "Collect 'em all, Morty! They're like *burp* Pokémon but with existential dread!"
        </span>
      </div>
    </div>
  )
}

export default Favorites

