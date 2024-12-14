import Image from "next/image";
import UserActivity from "@/app/ui/activity/user_activity";
import TilesHealth from "@/app/ui/zdrowie/tiles-health";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-col gap-4 md:overflow-hidden">
      <div>
        <TilesHealth />
      </div>
      <div className=""></div>
    </div>
  );
}
