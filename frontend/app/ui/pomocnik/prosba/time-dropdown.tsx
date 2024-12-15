import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TimeDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="bg-amber-600 border-2 px-4 py-2 border-white rounded-full shadow-lg hover:bg-amber-700 transition duration-300 ease-in-out transform hover:scale-105 text-2xl p-8">Jak długo mogę czekać</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-2">

        <DropdownMenuItem>
          Do 1 godziny
        </DropdownMenuItem>
        <DropdownMenuItem>
          Do 2 godzin
        </DropdownMenuItem>
        <DropdownMenuItem>
          Do 8 godzin
        </DropdownMenuItem>
        <DropdownMenuItem>
          Do 1 dnia
        </DropdownMenuItem>
        <DropdownMenuItem>
          Do 1 tygodnia
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
