'use client'

import PokemonCard from "@/components/pokemon-card"
import StatBar from "@/components/stats"
import { useGetPokemonDetail } from "@/hooks/usePokemon"
import { convertGramToKilogram, convertToMeter, formatFirstLetter, formatString, formattedText, typeColor } from "@/services/helper"
import { stat } from "@/services/type"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

export default function DetaikPokemon() {
    const { name } = useParams()
    const router = useRouter()

    const { data, isLoading, isError } = useGetPokemonDetail(name!.toString())
    if (isError) {
        return (
            <div className="flex justify-center">
                <div className="flex flex-col">
                    <div className="text-gray-500">
                        Error not found
                    </div>
                    <button onClick={() => router.back()} className="bg-[#3D3D8A] p-2 rounded-full shadow-lg hover:shadow-xl hover:bg-[#3D3D8A]/90 cursor-pointer">Back</button>
                </div>
            </div>
        )
    }
    if (isLoading) {
        return (
            <div className="space-y-2">
                <div className="animate-pulse bg-gray-500/40 w-full h-[200px] rounded-lg" />
                <div className="animate-pulse bg-gray-500/40 w-[200px] h-[20px] rounded-lg" />
                <div className="animate-pulse bg-gray-500/40 w-full h-[20px] rounded-lg" />
                <div className="animate-pulse bg-gray-500/40 w-full h-[20px] rounded-lg" />
                <div className="animate-pulse bg-gray-500/40 w-full h-[20px] rounded-lg" />
            </div>
        )
    }
    return (
        <>
            <div>
                <div className="flex w-full">
                    <button onClick={() => router.back()} className="cursor-pointer">
                        <ArrowBigLeft className="bg-[#3D3D8A] rounded-full w-10 h-10 max-md:w-8 max-md:h-8" />
                    </button>
                    {/* pokemon view image */}
                    <div className="font-bold w-full text-gray-600 text-center text-5xl max-md:text-2xl" >{formatFirstLetter(data?.species?.name)}</div>
                </div>
                <div className="max-md:flex max-md:flex-col grid grid-cols-2 gap-2">
                    <div className="relative">
                        <img src="/loading-icon.png" alt="" className="opacity-40" />
                        <img className="absolute top-0" src={`${data?.sprites?.other?.["official-artwork"]?.front_default}`} alt="" />
                    </div>
                    <div className="my-auto">
                        <div className="flex gap-2">
                            {
                                data?.types.map((type: any, i: number) => (
                                    <div className={`${typeColor(type.type.name)} p-1 px-3 rounded-lg shadow-md `} key={i}>
                                        {formatFirstLetter(type.type.name)}
                                    </div>
                                ))
                            }
                        </div>
                        {/* abilities */}
                        <div>
                            <div className="font-semibold text-gray-600">Abilities :</div>
                            <div className="flex gap-2">
                                {data?.abilities.map((item: any, i: number) => (
                                    <div
                                        key={i}
                                        className="bg-slate-100 text-black text-[13px] p-1 border border-gray-200 shadow-sm text-gray-700 rounded-full text-xs"
                                    >
                                        {formatString(formatFirstLetter(item.ability.name))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* base stats */}
                        <div>
                            <div className="font-semibold text-gray-600">
                                Base Stats
                            </div>
                            <div className="space-y-2">
                                {
                                    data.stats.map((s: stat, i: number) => (
                                        <StatBar value={s.base_stat} label={s.stat.name} key={s.stat.name} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* genus */}
                <div className="text-gray-600 space-y-2">
                    <div className="font-semibold">{data?.genera?.genus}</div>
                    <p className="text-sm">{formattedText(data?.flavorTextEntries?.flavor_text ?? "")}</p>
                    <div className="md:flex md:justify-between md:mx-20 md:text-xl">
                        <div>
                            <p>
                                <span className="font-semibold">Height : </span>
                                {convertToMeter(data?.height)}m
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="font-semibold">Weight : </span>
                                {convertGramToKilogram(data?.weight)}Kg
                            </p>
                        </div>
                    </div>
                    <div className="font-semibold">Evolution Chain</div>
                    <div className="flex justify-center max-sm:justify-center gap-2 ">
                        {data?.evolution.map((item: any, i: number) => (
                            <div key={item.name} className="flex gap-2">
                                <PokemonCard item={item} colors={data.color.color.name} />
                                {
                                    (i >= 0 && i < data?.evolution.length - 1) &&
                                    <div className="my-auto"> <ArrowBigRight className="w-20 h-20 max-md:w-10 max-md:h-10" /> </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}