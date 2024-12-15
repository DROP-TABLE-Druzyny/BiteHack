import Link from "next/link";
import SomeLogo from "@/app/ui/some-logo";

export default function SideNav({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex md:h-[20vh] flex-col px-3 py-4 md:px-2 ">
      <Link
        className="mb-2 flex h-max items-end justify-start rounded-xl bg-amber-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <SomeLogo />
        </div>  
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 h-full md:h-[70vh]">
        {children}

        <div className="hidden h-auto w-full grow rounded-xl bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
