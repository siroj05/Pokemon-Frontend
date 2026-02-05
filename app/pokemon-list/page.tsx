import ListPokemon from "@/components/list-pokemon";
import { Suspense } from "react";
export const dynamic = 'force-dynamic';
export default function Page() {
  return(
    <Suspense>
      <ListPokemon/>
    </Suspense>
  )
}
