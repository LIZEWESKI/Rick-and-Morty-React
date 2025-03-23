import { useLocation, Link } from "react-router-dom"
import { ChevronRight, Home, Heart, Users } from "lucide-react"

const BreadCrumbs = ({currentPath}) => {
  const location = useLocation();
  const redirectSP = `?${location.state?.sp}` || ""
  return (
    <nav className="mb-8">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <li className="flex items-center gap-1">
          <Link to="/" className="flex items-center gap-1 hover:text-primary">
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>

        <li className="flex items-center">
          <ChevronRight className="h-4 w-4" />
        </li>

        <li className="flex items-center gap-1">
          <Link to="/favorites" className="flex items-center gap-1 hover:text-primary">
            <Heart className="h-3.5 w-3.5" />
            <span>Favorites</span>
          </Link>
        </li>

        <li className="flex items-center">
          <ChevronRight className="h-4 w-4" />
        </li>

        <li className="flex items-center gap-1">
          <Link to={`/characters${redirectSP}`} className="flex items-center gap-1 hover:text-primary">
            <Users className="h-3.5 w-3.5" />
            <span>Characters</span>
          </Link>
        </li>

        <li className="flex items-center">
          <ChevronRight className="h-4 w-4" />
        </li>

        <li className="line-clamp-1 max-w-[200px] font-medium text-foreground">{currentPath}</li>
      </ol>
    </nav>
  )
}

export default BreadCrumbs

