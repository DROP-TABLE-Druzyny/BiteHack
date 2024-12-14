import Image from "next/image";
import UserActivity from "@/app/ui/activity/user_activity";

export default function Page() {
  const userData = {
    id: 1,
    name: "John Brown",
    email: "example@email.com",
    avatar_img_url: "/avatars/avatar1.png",
    route_img_url: "/example/route1.png",
    text: "Lorem ipsum dolor sit amet",
    date: "2024-12-11T00:00:00Z",
  };
  
  return (
    <div className="flex flex-col md:flex-col gap-4 md:overflow-hidden">
      <UserActivity userData={userData}/>
      <UserActivity userData={{ ...userData, name: "Adam Kowalski", id: 2 }}/>
      <UserActivity userData={{ ...userData, name: "Anna Nowak", id: 3 }}/>
    </div>
  );
}
