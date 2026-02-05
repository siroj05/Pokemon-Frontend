import { stat } from "@/services/type"
import StatBar from "./stats"

interface Props {
    stats : stat[]
}

export default function BaseStats({stats}:Props) {
    return (
        <div>
            <div className="font-semibold text-gray-600">
                Base Stats
            </div>
            <div className="space-y-2">
                {
                    stats.map((s) => (
                        <StatBar value={s.base_stat} label={s.stat.name} key={s.stat.name} />
                    ))
                }
            </div>
        </div>
    )
}