import { useRouter } from "next/navigation"

export default function ErrorHandler(){
    const router = useRouter()
    return(
        <div className="flex justify-center">
            <div className="flex flex-col">
              <div className="text-gray-500">
                Error not found
              </div>
              <button onClick={() => router.push("/")} className="bg-[#3D3D8A] p-2 rounded-full shadow-lg hover:shadow-xl hover:bg-[#3D3D8A]/90 cursor-pointer">Back</button>
            </div>
          </div>
    )
}