import Image from "next/image";
import Link from "next/link";
import CategoryItem from "./category-item";
import { Button } from "@/components/ui/button";

interface TileData {
  tileData: { title: string, icon:any };
  isSelected: Boolean;
  onClick: () => void;
}

export default function RequestTypeTile({ tileData,isSelected, onClick }: TileData) {

  const TileIcon = tileData.icon;
  const radius = 60;
  const angle = 0;
  return (
    <button onClick={onClick} type="button">
    <CategoryItem
      key={tileData.title}
      href={"/"}
      icon={TileIcon}
      label={tileData.title}
      radius={radius}
      style={{
        position: "relative",
      }}
      className={isSelected ? "bg-green-600 hover:bg-green-700" : ""}
      
    />
    </button>

  );
}


