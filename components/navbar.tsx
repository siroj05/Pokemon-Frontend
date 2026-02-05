'use client'
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useStore } from "@/store/store";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const { setSearchIsDialogOpen } = useStore()
  const router = useRouter()
  return (
    <div className="sticky top-0 z-30">
      <div className="bg-[#3D3D8A] flex justify-between p-3 text-[#FACC15] text-2xl font-bold  border-b-8">
        <div className="flex justify-center max-md:justify-start w-full">
          <button onClick={() => router.push("/pokemon-list")} className="flex cursor-pointer">
            <img
              src="/ball-pokemon.png"
              alt="ball-pokemon"
              className="w-[70px] h-[70px] max-md:w-[30px] max-md:h-[30px]"
            />
            <img
              src="/pokemon-logo.png"
              alt="Pokemon Logo"
              className="w-[200px] h-[70px] max-md:w-[100px] max-md:h-[30px]"
            />
          </button>
        </div>
        {isMobile && <button onClick={() =>setSearchIsDialogOpen(true)} className="bg-[#FACC15] flex justify-end rounded-full w-[70px]">
          <span className="text-xs text-[#3D3D8A] my-auto">Search</span>
          <Search className="my-auto text-[#3D3D8A] shadow-xl"/>
        </button>}
      </div>
    </div>
  );
}
