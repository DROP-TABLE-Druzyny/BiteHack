import { UsersIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function SomeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}>
      <div >
        <UsersIcon className="h-28 w-16 mr-2" />
      </div>
      <p className="text-[50px] ">eSenior </p>

    </div>
  );
}
