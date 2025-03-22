import { useState } from "react"
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle,SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Logo from "../assets/logo-brand.webp"

const Header = () => {
  const [activeLink, setActiveLink] = useState("home")
  const [open, setOpen] = useState(false);
  const handleNavClick = (link) => {
    setActiveLink(link)
    setOpen(false);
  }
  return (
    <header className="sticky  top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-20 px-4">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-primary/10">
              <img src={Logo} alt="Rick and Morty Logo" className="h-full w-full object-cover" />
            </div>
            <span className="hidden font-bold sm:inline-block">Multiverse Cards</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-6">
            <NavItem
              to="/characters"
              label="Characters"
              isActive={activeLink === "characters"}
              onClick={() => handleNavClick("characters")}
            />
            <NavItem
              to="/quiz"
              label="Jerry Quiz"
              isActive={activeLink === "quiz"}
              onClick={() => handleNavClick("quiz")}
            />
            <NavItem
              to="/favorites"
              label="Favorites"
              isActive={activeLink === "favorites"}
              onClick={() => handleNavClick("favorites")}
            />
            <NavItem
              to="/about"
              label="About"
              isActive={activeLink === "about"}
              onClick={() => handleNavClick("about")}
            />
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden cursor-pointer">
            <Button variant="ghost" size="icon" className="h-9 w-9 ">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left text-lg font-bold">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary/10">
                    <img src={Logo} alt="Rick and Morty Logo" className="h-full w-full object-cover" />
                  </div>
                  <span>Multiverse Cards</span>
                </div>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8">
              <ul className="flex flex-col gap-2 px-2">
                <MobileNavItem
                  to="/"
                  label="Home"
                  isActive={activeLink === "home"}
                  onClick={() => handleNavClick("home")}
                />
                <MobileNavItem
                  to="/characters"
                  label="Characters"
                  isActive={activeLink === "characters"}
                  onClick={() => handleNavClick("characters")}
                />
                <MobileNavItem
                  to="/quiz"
                  label="Jerry Quiz"
                  isActive={activeLink === "quiz"}
                  onClick={() => handleNavClick("quiz")}
                />
                <MobileNavItem
                  to="/favorites"
                  label="Favorites"
                  isActive={activeLink === "favorites"}
                  onClick={() => handleNavClick("favorites")}
                />
                <MobileNavItem
                  to="/about"
                  label="About"
                  isActive={activeLink === "about"}
                  onClick={() => handleNavClick("about")}
                />
              </ul>
            </nav>
            <SheetDescription className="mt-auto p-2 text-sm">
              &copy; {new Date().getFullYear()} Multiverse Cards.
          </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

const NavItem = ({ to, label, isActive, onClick }) => {
  return (
    <li>
      <Link
        to={to}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-muted-foreground",
        )}
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  )
}

const MobileNavItem = ({ to, label, isActive, onClick }) => {
  return (
    <li>
      <Link
        to={to}
        className={cn(
          "flex w-full items-center py-1 text-base font-bold transition-colors hover:text-primary border-b-[1px] border-border",
          isActive ? "text-primary" : "text-muted-foreground",
        )}
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  )
}

export default Header

