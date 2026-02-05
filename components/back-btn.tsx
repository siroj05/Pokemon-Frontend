import { ArrowBigLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BackButton() {
    const router = useRouter()
    return (
        <button onClick={() => router.back()} className="cursor-pointer">
            <ArrowBigLeft className="bg-[#3D3D8A] rounded-full w-10 h-10 max-md:w-8 max-md:h-8" />
        </button>
    )
}