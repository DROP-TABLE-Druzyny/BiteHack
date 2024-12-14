import clsx from "clsx";
import Image from "next/image";
import { MapIcon } from "@heroicons/react/24/outline";
import TileHealth from "./tile-health";
import imieninyData from "@/public/zdrowie/imieniny.json";

export default function TilesHealth() {

  const tilesData = {"date": "01.01",
        "health_advise": "30 minut spaceru dziennie zmniejsza ryzyko zawału o 25%.",
        "healthy_meal": "Jogurt naturalny z owocami i orzechami.",
        "name_day": "Mieczysława, Mieszka",
        "trivia": "Na noworocznych obyczajach w Szkocji spożywa się haggis.",
        "joke": "Dlaczego komputer się przeziębił? Bo zostawił otwarte okno."}

  const weather = "Zachmurzenie umiarkowane, temperatura 10°C, wiatr 15 km/h"; // TODO: fetch from API

  const today = new Date();
  const formattedDate = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  let todayNameDay = imieninyData.find((item) => item.date === formattedDate);

  const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
  const dayOfWeek = daysOfWeek[today.getDay()];
  if(!todayNameDay)
    todayNameDay={ date: '12-14', name_day: 'Alfreda, Izydora (placeholder)' }
  console.log(todayNameDay);


  return (  
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <TileHealth tileData={{ title: `${dayOfWeek} ${formattedDate}`, text: `Imieniny obchodzą dzisiaj: ${todayNameDay.name_day}`}} />
      <TileHealth tileData={{ title: "Pogoda", text: weather }} />  
      <TileHealth tileData={{ title: "Porada zdrowotna", text: tilesData.health_advise }} />
      <TileHealth tileData={{ title: "Zdrowy posiłek na dziś", text: tilesData.healthy_meal }} />
      <TileHealth tileData={{ title: "Ciekawostka", text: tilesData.trivia }} />
      <TileHealth tileData={{ title: "Żart", text: tilesData.joke }} />
    </div>
  );
}
