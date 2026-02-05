'use client'
import { useStore } from "@/store/store";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchDialog() {
    const { setSearchIsDialogOpen, searchIsDialogOpen } = useStore();
    const router = useRouter()
    const searchParams = useSearchParams()
    const [value, setValue] = useState("")

    const handleSearch = (e: React.MouseEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString())
        if(value.trim()){
            params.set("page", "1")
            params.set("search", value.toLocaleLowerCase())
        }else{
            params.delete("search")
        }
        router.replace(`/pokemon-list/?${params.toString()}`)
        setSearchIsDialogOpen(false);
    };

    const handleBackdropClick = () => {
        setSearchIsDialogOpen(false);
    };

    if (!searchIsDialogOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/50"
                onClick={handleBackdropClick}
            />

            {/* Dialog */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSearch(e as any);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-[600px] relative flex pointer-events-auto"
                >
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        type="text"
                        className="text-black px-4 py-2 border-2 border-[#3D3D8A] bg-white w-full rounded-xl outline-none focus:shadow-xl shadow-lg"
                        autoFocus
                    />

                    <button
                        onClick={handleSearch}
                        type="button"
                        className="bg-[#3D3D8A] absolute right-0 top-0 h-full px-3 rounded-r-xl flex items-center"
                    >
                        <Search className="text-yellow-400" />
                    </button>
                </form>
            </div>
        </>
    );
}