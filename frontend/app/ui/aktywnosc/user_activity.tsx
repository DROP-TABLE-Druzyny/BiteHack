import clsx from "clsx";
import Image from "next/image";
import { MapIcon } from "@heroicons/react/24/outline";

interface UserData {
    id: number;
    name: string;
    email: string;
    avatar_img_url: string;
    route_img_url: string;
    text: string;
    date: string;
  }
  
export default function UserActivity({ userData }: {userData: UserData}) {

  const dateObject = new Date(userData.date);
  const formattedDate = dateObject.toLocaleDateString();
  return (
    <div key={userData.id} className="flex flex-col border w-full">
      <div
        className="flex flex-row items-center justify-between px-7 py-4 w-full"
      >
        <div className="flex items-center">
          <Image
            src={userData.avatar_img_url}
            alt={`${userData.name}'s profile picture`}
            className="mr-4 rounded-full"
            width={40}
            height={40}
          />
          <div className="min-w-0 mr-2">
            <p className="truncate text-sm font-semibold md:text-base">
              {userData.name}
            </p>
            <p className="hidden text-sm text-gray-500 sm:block">
              {userData.email}
            </p>
          </div>

        </div>
        <div className={`truncate text-sm font-medium md:text-base`}>
          <p>{formattedDate}</p>
        
        </div>
      </div>

      <hr></hr>
      <div className="flex flex-col w-full px-7 py-4">
        
        <Image
        src={userData.route_img_url}
        alt={`${userData.name} route image`}
        width={400}
        height={400}
        className="block rounded-xl my-2"
        />
        
        <p className="pl-1 pt-2">
            {userData.text}
        </p>

      </div>
    </div>
  );
}
