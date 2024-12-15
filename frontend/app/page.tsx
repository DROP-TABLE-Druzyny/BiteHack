import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import Navigation from "./ui/mainpage/navigation";
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <div className="flex min-h-screen p-8 relative w-full justify-center">
      <main className="flex flex-col items-center">
        <h1 className="flex flex-row px-8 py-3 mt-12 mb-6 bg-amber-600 border-2 border-white rounded-full shadow-lg text-4xl text-white drop-shadow-md font-bold ">
         <UsersIcon className="h-10 w-10 mr-2" />
          <p className={lusitana.className}>eSenior</p>
        </h1>
        <Navigation/>
      </main>
      <a href="/wolontariusz" className="absolute bottom-4 start-1/2 -translate-x-1/2 px-4 py-1 bg-amber-600 border-2 border-white rounded-full shadow-lg text-md text-white drop-shadow-md hover:bg-amber-600 transition duration-300 ease-in-out transform hover:scale-105">
          Jesteś wolontariuszem?
        </a>
    </div>
  );
}