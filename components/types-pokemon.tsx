import { formatFirstLetter, typeColor } from "@/services/helper"
import { typesPokemon } from "@/services/type"

interface Props{
    typesPokemon : typesPokemon[]
}

export default function TypesPokemon({typesPokemon}:Props) {
    return (
        <div className="flex gap-2">
            {
                typesPokemon.map((type, i: number) => (
                    <div className={`${typeColor(type.type.name)} p-1 px-3 rounded-lg shadow-md `} key={i}>
                        {formatFirstLetter(type.type.name)}
                    </div>
                ))
            }
        </div>
    )
}