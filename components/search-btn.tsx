'use client'

import { useStore } from '@/store/store';
import { Search } from 'lucide-react';

export default function SearchBtn() {
    const { setSearchIsDialogOpen, searchIsDialogOpen } = useStore()
    return (
        <button onClick={() => setSearchIsDialogOpen(!searchIsDialogOpen)} className="
                fixed top-1/2 -translate-y-1/2 z-50
                bg-[#3D3D8A] text-yellow-400
                w-[100px] h-[80px]
                rounded-r-full shadow-xl text-center
                hover:w-[110px] hover:px-1 hover:shadow-2xl
                transition-all duration-100
                cursor-pointer
                ">
            <Search className="w-20 h-20" />
        </button>
    )
}