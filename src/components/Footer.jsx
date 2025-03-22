import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between items-center md:px-20 p-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Mutiverse Cards inc.
      </p>
      <div className="flex flex-wrap gap-3">
          <Button variant="ghost" className="justify-start space-x-2" asChild>
              <a href="https://github.com/lizeweski" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              </a>
          </Button>
      </div>
    </footer>
  )
}
export default Footer