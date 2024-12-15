import EventsMap from "@/app/ui/aktywnosc/EventsMap";
import SideNavEvents from "@/app/ui/sidenav-events";
import EventsDisplayer from "@/app/ui/aktywnosc/events-displayer";
import { MapProvider } from "@/context/MapContext";

export default function Page() {
  return (
    <span>
      <MapProvider>
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
      </MapProvider>
    </span>
  );
}