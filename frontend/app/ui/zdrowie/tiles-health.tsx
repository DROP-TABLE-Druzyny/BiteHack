import clsx from "clsx";
import Image from "next/image";
import { MapIcon } from "@heroicons/react/24/outline";
import TileHealth from "./tile-health";


export default function TilesHealth() {

  const tilesData = {"date": "01.01",
        "health_advise": "30 minut spaceru dziennie zmniejsza ryzyko zawału o 25%.",
        "healthy_meal": "Jogurt naturalny z owocami i orzechami.",
        "name_day": "Mieczysława, Mieszka",
        "trivia": "Na noworocznych obyczajach w Szkocji spożywa się haggis.",
        "joke": "Dlaczego komputer się przeziębił? Bo zostawił otwarte okno."}

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <TileHealth tileData={{ title: "Data", text: tilesData.date }} />
      <TileHealth tileData={{ title: "Imieniny", text: tilesData.name_day }} />
      <TileHealth tileData={{ title: "Porada zdrowotna", text: tilesData.health_advise }} />
      <TileHealth tileData={{ title: "Zdrowy posiłek na dziś", text: tilesData.healthy_meal }} />
      <TileHealth tileData={{ title: "Ciekawostka", text: tilesData.trivia }} />
      <TileHealth tileData={{ title: "Żart", text: tilesData.joke }} />
    </div>
  );
}
