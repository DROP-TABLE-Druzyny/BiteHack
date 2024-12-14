import TileHealth from "./tile-health";
import imieninyData from "@/public/zdrowie/imieniny.json";
import kartkaZKalendarzaData from "@/public/zdrowie/kartka_z_kalendarza.json";

const CITY = 'Krakow';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=pl`;

export  default async function TilesHealth() {
  const randomIndex = Math.floor(Math.random() * kartkaZKalendarzaData.length);
  const tilesData = kartkaZKalendarzaData[randomIndex];

  const weather = "Zachmurzenie duże, temperatura 3°C, wiatr 6 km/h"; // TODO: fetch from API
  
  const today = new Date();
  const dateForSearch = 
    `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}`;
  const formattedDate = `${dateForSearch}.${today.getFullYear()}`;
  let todayNameDay = imieninyData.find((item) => item.date === dateForSearch);
  
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


  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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

