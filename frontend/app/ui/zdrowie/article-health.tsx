import Image from "next/image";

interface ArticleData {
    id: number;
    name: string;
    avatar_img_url: string;
    route_img_url: string;
    ingrediends: string;
    recipe: string;
  }
  
export default function ArticleHealth({ articleData: articleData }: {articleData: ArticleData}) {

  return (
    <div key={articleData.id} className="flex flex-col text-2xl border w-full rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-row items-center justify-between px-7 py-4 w-full bg-gray-100">
        <div className="flex items-center">
          <Image
            src={articleData.avatar_img_url}
            alt={`${articleData.name}'s profile picture`}
            className="mr-4 rounded-full"
            width={40}
            height={40}
          />
          <div className="min-w-0">
            <p className="truncate font-semibold">{articleData.name}</p>
          </div>
        </div>
        <p className="truncate font-medium text-gray-600">{1234}</p>
      </div>
  
      <hr className="border-gray-300" />
  
      <div className="flex flex-col md:flex-row w-full px-7 py-4 text-[16px] items-start md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <p className="whitespace-pre-line">
            {articleData.ingrediends}
            </p>
        </div>

        <div className="flex-1 ">
          <p className="whitespace-pre-line">
            {articleData.recipe}
            </p>
        </div>
        <Image
            src={articleData.route_img_url}
            alt={`Zdjęcie przedstawiające ${articleData.name}`}
            width={400}
            height={400}
            className="rounded-xl md:ml-4"
          />
      </div>
    </div>
  );
}
