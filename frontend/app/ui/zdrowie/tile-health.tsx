interface TileData {
  title: string;
  text: string;
}

export default function TileHealth({ tileData }: { tileData: TileData }) {
  return (
    <div className="flex flex-col border w-full bg-amber-50 rounded-2xl">
      <div className="flex flex-row items-center justify-between px-7 py-4 w-full text-3xl">
        <div className="min-w-0 mr-2">
          <p className="truncate font-semibold ">{tileData.title}</p>
        </div>
      </div>

      <hr></hr>
      <div className="flex flex-col w-full px-7 py-4 text-2xl">
        <p className="pl-1 pt-2">{tileData.text}</p>
      </div>
    </div>
  );
}
