'use client'

import Abilities from "@/components/abilities"
import BackButton from "@/components/back-btn"
import BaseStats from "@/components/base-stats"
import ErrorHandler from "@/components/error-handler"
import LoadingSkeleton from "@/components/loading-skeleton"
import PokemonCard from "@/components/pokemon-card"
import StatBar from "@/components/stats"
import TypesPokemon from "@/components/types-pokemon"
import { useGetPokemonDetail } from "@/hooks/usePokemon"
import { convertGramToKilogram, convertToMeter, formatFirstLetter, formatString, formattedText, typeColor } from "@/services/helper"
import { stat } from "@/services/type"
import { ArrowBigRight } from "lucide-react"
import { useParams } from "next/navigation"

export default function DetaikPokemon() {
    const { name } = useParams()
    const { data, isLoading, isError } = useGetPokemonDetail(name!.toString())

    if (isError) {
        return <ErrorHandler />
    }

    if (isLoading) {
        return <LoadingSkeleton/>
    }
    return (
        <>
            <div>
                <div className="flex w-full">
                    <BackButton/>
                    {/* name of pokemon */}
                    <div className="font-bold w-full text-gray-600 text-center text-5xl max-md:text-2xl" >{formatFirstLetter(data?.species?.name)}</div>
                </div>
                    {/* pokemon view image */}
                <div className="max-md:flex max-md:flex-col grid grid-cols-2 gap-2">
                    <div className="relative">
                        <img src="/loading-icon.png" alt="" className="opacity-40" />
                        <img className="absolute top-0" src={`${data?.sprites?.other?.["official-artwork"]?.front_default}`} alt="" />
                    </div>
                    <div className="my-auto space-y-3">
                        {/* typesPokemon */}
                        <TypesPokemon typesPokemon={data?.types}/>
                        {/* abilities */}
                        <Abilities items={data?.abilities} />
                        {/* base stats */}
                        <BaseStats stats={data?.stats}/>
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