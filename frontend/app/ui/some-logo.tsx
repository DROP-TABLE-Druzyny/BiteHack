import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function SomeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}>
      <div >
        <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      </div>
      <p className="text-[32px] ">LiveActive </p>

    </div>
  );
}
