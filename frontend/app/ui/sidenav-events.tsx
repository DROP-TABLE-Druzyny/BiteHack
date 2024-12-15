import SideNav from "./sidenav";

export default function SideNavEvents({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideNav>
      <div className="flex flex-col p-2 md:px-2 gap-4 h-full w-full">
        {children}
      </div>
    </SideNav>
  );
}
