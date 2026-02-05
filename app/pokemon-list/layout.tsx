'use client'
import Navbar from "@/components/navbar"
import SearchBtn from "@/components/search-btn"
import SearchDialog from "@/components/search-dialog"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { ReactNode } from "react"
interface Props {
    children: ReactNode
}
export default function Layout({ children }: Props) {
    const isMobile = useMediaQuery("(max-width: 1023px)")
    return (
        <div className="flex flex-col min-h-dvh">
            <Navbar />
            <SearchDialog/>
            {!isMobile && <SearchBtn/>}
            <div className="mx-auto max-w-5xl w-full py-5 px-10 max-sm:px-3">
                {children}
            </div>
        </div>
    )
}