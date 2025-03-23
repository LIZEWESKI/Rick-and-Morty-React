import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Filter, X, Search } from "lucide-react"
import { filterOptions } from "../utils/filterOptions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const FilterComponent = () => {
  const [filterData, setFilterData] = useState({
    name: "",
    status: "",
    gender: "",
    species: "",
  })

  const [sp, setSp] = useSearchParams()

  // Get active filters from URL params
  const activeFilters = Array.from(sp.entries())
    .filter(([key]) => key !== "page")
    .map(([key, value]) => ({ key, value }))

  function handleOnChange(name, value) {
    setFilterData((prevState) => ({
      ...prevState,
      [name]: typeof value === "string" ? value.toLowerCase().trim() : "",
    }))
  }

  function handleFilter(e) {
    e.preventDefault()
    const filterKeyValues = Object.entries(filterData)
    setSp((prevParams) => {
      return filterKeyValues.reduce((params, [key, value]) => {
        params.has("page") && params.delete("page")
        value === "" ? params.delete(key) : params.set(key, value)
        return params
      }, prevParams)
    })
  }

  function clearFilter(key) {
    setSp((prevParams) => {
      prevParams.delete(key)
      return new URLSearchParams(prevParams)
    })

    setFilterData((prev) => ({
      ...prev,
      [key]: "",
    }))
  }

  function clearAllFilters() {
    setSp(new URLSearchParams())
    setFilterData({
      name: "",
      status: "",
      gender: "",
      species: "",
    })
  }

  return (
    <Card className="mb-8 border-border/50 bg-card/95 backdrop-blur">
      <CardHeader className="pb-1">
        <CardTitle className="text-xl flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter Characters
        </CardTitle>
        <CardDescription>
          For best results, use simple and fewer filters. Combine wisely to find specific characters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFilter} className="space-y-2">
          <div className="flex flex-wrap gap-2 pt-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                name="name"
                placeholder="Search by name..."
                className="pl-8 "
                value={filterData.name}
                onChange={(e) => handleOnChange("name", e.target.value)}
              />
            </div>

            {filterOptions.map((filterOption) => (
              <Select
                key={filterOption.id}
                value={filterData[filterOption.value.toLowerCase()]}
                onValueChange={(value) => handleOnChange(filterOption.value.toLowerCase(), value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={filterOption.value} />
                </SelectTrigger>
                <SelectContent>
                  {filterOption.options.map((option) => (
                    <SelectItem key={option} value={option.toLowerCase()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
          <div className="flex gap-6 flex-row-reverse">
            <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                <Filter className="h-4 w-4" />
                Apply Filters
                </Button>
            </div>
            {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                {activeFilters.map(({ key, value }) => (
                    <Badge key={key} variant="secondary" className="gap-1">
                    {key}: {value}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-transparent cursor-pointer"
                        onClick={() => clearFilter(key)}
                    >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {key} filter</span>
                    </Button>
                    </Badge>
                ))}

                {activeFilters.length > 1 && (
                    <Button variant="ghost" size="sm" className="h-6 text-xs cursor-pointer" onClick={clearAllFilters}>
                    Clear all
                    </Button>
                )}
                </div>
            )}
          </div>

          
        </form>
      </CardContent>
    </Card>
  )
}

export default FilterComponent

