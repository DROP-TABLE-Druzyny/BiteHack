import Image from "next/image";
import Link from "next/link";
import CategoryItem from "./category-item";

interface TileData {
  title: string;
  icon: any;
}

export default function RequestTypeTile({ tileData }: { tileData: TileData }) {
  const TileIcon = tileData.icon;
  const radius = 60;
  const angle = 0;
  return (
    <CategoryItem
      key={tileData.title}
      href={"/"}
      icon={TileIcon}
      label={tileData.title}
      radius={radius}
      angle={angle}
      style={{
        position: "relative",
      }}
    />
  );
}
