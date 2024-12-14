import Image from "next/image";
import UserActivity from "@/app/ui/activity/user_activity";
import EventsMap from "@/app/ui/aktywnosc/EventsMap";
import SideNavEvents from "@/app/ui/sidenav-events";
import EventSidenav from "@/app/ui/aktywnosc/event-sidenav";
import EventsDisplayer from "@/app/ui/aktywnosc/events-displayer";

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

    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-96">
            <SideNavEvents>
              <EventsDisplayer/>
            </SideNavEvents>
          </div>
          <div className="flex-grow p-4 md:overflow-y-auto md:p-8">
            <div className="flex flex-col md:flex-col gap-4 md:overflow-hidden">
              <EventsMap/>
            </div>
          </div>
      </div>
  );
}
