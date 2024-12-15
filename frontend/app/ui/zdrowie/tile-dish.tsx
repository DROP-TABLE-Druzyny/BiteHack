import Image from "next/image";
import Link from "next/link";

interface TileData {
    title: string;
    img_url: string;
    site_url: string;
  }
  
  export default function TileDish({ tileData }: { tileData: TileData }) {
    return (
      <Link href={tileData.site_url} className="">
        <Image
            src={tileData.img_url}
            alt={`Zdjęcie przedstawiające ${tileData.title}`}
            width={400}
            height={400}
            className="rounded-2xl"
        />
        <label className="block text-xl text-center mt-2 capitalize">{tileData.title}</label>
      </Link>
    );
  }
  