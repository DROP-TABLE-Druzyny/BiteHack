import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TimeDropdown({ onChange } :{onChange: (value: string) => void}) {
  const handleItemClick = (value:string) => {
    onChange(value);
  };

  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="bg-amber-600 border-2 px-4 py-2 border-white rounded-full shadow-lg hover:bg-amber-700 transition duration-300 ease-in-out transform hover:scale-105 text-2xl p-8">Jak długo mogę czekać</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-2">

        <DropdownMenuItem onClick={() => handleItemClick("1hour")}>
          Do 1 godziny
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleItemClick("2hour")}>
          Do 2 godzin
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleItemClick("4hour")}>
          Do 4 godzin
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleItemClick("1day")}>
          Do 1 dnia
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleItemClick("1week")}>
          Do 1 tygodnia
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
