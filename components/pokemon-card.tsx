'use client'
import { PokemonModel } from "@/services/type"
import Link from "next/link"

const colorMap: Record<string, string> = {
  red: "bg-red-500/40",
  blue: "bg-blue-500/40",
  yellow: "bg-yellow-400",
  green: "bg-green-500/40",
  black: "bg-slate-800/40",
  white: "bg-slate-100/40",
  purple: "bg-purple-500/40",
  pink: "bg-pink-400/40",
  brown: "bg-amber-700/40",
  gray: "bg-gray-400/40",
}

interface Props {
    item : PokemonModel
    colors : string
}

export default function PokemonCard({item, colors}:Props) {
    return (
        <Link href={`/pokemon-list/${item.name}`}>
            <div className={`${colorMap[colors]} rounded-lg h-[250px] max-sm:h-[80px] text-black hover:scale-[105%] transition duration-100`}>
                <img
                    src={`${item.image}`}
                    alt="pokemon"
                    className="h-[200px] w-full max-sm:h-[65px]"
                />
                <div className="text-center font-semibold max-sm:text-[8px]">
                    {item.name}
                </div>
            </div>
        </Link>
    )
}