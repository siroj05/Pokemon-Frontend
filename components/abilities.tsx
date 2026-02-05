import { formatFirstLetter, formatString } from "@/services/helper";
import { abilities } from "@/services/type";

interface Props {
    items: abilities[]
}
export default function Abilities({ items }: Props) {
    return (
        <div>
            <div className="font-semibold text-gray-600">Abilities :</div>
            <div className="flex gap-2">
                {items?.map((item: any, i: number) => (
                    <div
                        key={i}
                        className="bg-slate-100 text-black text-[13px] p-1 border border-gray-200 shadow-sm text-gray-700 rounded-full text-xs"
                    >
                        {formatString(formatFirstLetter(item.ability.name))}
                    </div>
                ))}
            </div>
        </div>

    )
}