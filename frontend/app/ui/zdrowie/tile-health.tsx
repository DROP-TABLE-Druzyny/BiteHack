import clsx from "clsx";
import Image from "next/image";
import { MapIcon } from "@heroicons/react/24/outline";

interface TileData {
    title: string;
    text: string;

  }
  
export default function TileHealth({ tileData }: {tileData: TileData}) {

  return (
    <div className="flex flex-col border w-full text-xl ">
      <div
        className="flex flex-row items-center justify-between px-7 py-4 w-full"
      >
        <div className="flex items-center">

          <div className="min-w-0 mr-2">
            <p className="truncate font-semibold ">
              {tileData.title}
            </p>
            <p className="hidden text-sm text-gray-500 sm:block">
              {tileData.text}
            </p>
          </div>

        </div>

      </div>

      <hr></hr>
      <div className="flex flex-col w-full px-7 py-4">
        
        <p className="pl-1 pt-2">
            {tileData.text}
        </p>

      </div>
    </div>
  );
}
