import TileHealth from "./tile-health";
import imieninyData from "@/public/zdrowie/imieniny.json";
import kartkaZKalendarzaData from "@/public/zdrowie/kartka_z_kalendarza.json";

export default function TilesHealth() {
  const randomIndex = Math.floor(Math.random() * kartkaZKalendarzaData.length);
  const tilesData = kartkaZKalendarzaData[randomIndex];

  const weather = "Zachmurzenie umiarkowane, temperatura 10°C, wiatr 15 km/h"; // TODO: fetch from API

  const today = new Date();
  const dateForSearch = 
    `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}`;
  const formattedDate = `${dateForSearch}.${today.getFullYear()}`;
  let todayNameDay = imieninyData.find((item) => item.date === dateForSearch);
  
  console.log(todayNameDay);
  const daysOfWeek = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];
  const dayOfWeek = daysOfWeek[today.getDay()];

  if (!todayNameDay)
    todayNameDay = {
      date: "15.12",
      name_day: "Celina, Walerian",
    };

  console.log(todayNameDay);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <TileHealth
        tileData={{
          title: `${dayOfWeek} ${formattedDate}`,
          text: `Imieniny obchodzą dzisiaj: ${todayNameDay.name_day}`,
        }}
      />
      <TileHealth tileData={{ title: "Pogoda", text: weather }} />
      <TileHealth
        tileData={{ title: "Porada zdrowotna", text: tilesData.health_advise }}
      />
      <TileHealth
        tileData={{
          title: "Zdrowy posiłek na dziś",
          text: tilesData.healthy_meal,
        }}
      />
      <TileHealth tileData={{ title: "Ciekawostka", text: tilesData.trivia }} />
      <TileHealth tileData={{ title: "Żart", text: tilesData.joke }} />
    </div>
  );
}

