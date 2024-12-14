
import ArticleHealth from "@/app/ui/zdrowie/article-health";
import TileDish from "@/app/ui/zdrowie/tile-dish";
import TilesHealth from "@/app/ui/zdrowie/tiles-health";

export default function Page() {

  const tilesData = [
    {
      title: "Ciasto marchewkowe fit",
      img_url: "/zdrowie/articles/ciasto-marchewkowe-fit.png"
    },
    {
      title: "Krem grzybowy",
      img_url: "/zdrowie/articles/krem-grzybowy.png"
    },
    {
      title: "papryka fit",
      img_url: "/zdrowie/articles/papryka-fit.png"
    },
    {
      title: "potrawka z podgrzybkow",
      img_url: "/zdrowie/articles/potrawka-z-podgrzybkow.png"
    },
    {
      title: "salatka z burakami",
      img_url: "/zdrowie/articles/salatka-z-burakami.png"
    },
    {
      title: "salatka z serem feta",
      img_url: "/zdrowie/articles/salatka-z-serem-feta.png"
    },
    {
      title: "Salmorejo",
      img_url: "/zdrowie/articles/Salmorejo.png"
    },
    {
      title: "smoothie",
      img_url: "/zdrowie/articles/smoothie.png"
    }
  ];
  

  return (
    <div className="flex flex-col md:flex-col gap-4 md:overflow-hidden">
        <TilesHealth />
      <hr></hr>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-2">

      {tilesData.map((data, index) => (
          <TileDish key={index} tileData={data} />
        ))}

        


      </div>
    </div>
  );
}
