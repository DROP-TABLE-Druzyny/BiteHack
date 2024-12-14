import Image from "next/image";

interface TileData {
    title: string;
    img_url: string;
  }
  
  export default function TileDish({ tileData }: { tileData: TileData }) {
    return (
        

      <div className="">
        <Image
            src={tileData.img_url}
            alt={`Zdjęcie przedstawiające ${tileData.title}`}
            width={400}
            height={400}
            className="rounded-2xl"
        />
      </div>
    );
  }
  