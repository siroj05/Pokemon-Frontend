import getDetailPokemon, { getPokemonList } from "@/services/pokemon.services"
import { ListPokemonModel } from "@/services/type"
import { useQuery } from "@tanstack/react-query"

export const usePokemonList = (limit : number, offset : number, search: string | null) => {
    return useQuery<ListPokemonModel>({
        queryKey : ['pokemon-list', limit, offset, search],
        queryFn : async () => {
            const res = await getPokemonList({limit, offset, query : search})
            return res.data
        },
        refetchOnWindowFocus : false
    })
}

export const useGetPokemonDetail = (name : string) => {
    return useQuery({
        queryKey : ['pokemon-detail', name],
        queryFn : async () => {
            const res = await getDetailPokemon(name)
            return res
        },
        refetchOnWindowFocus : false
    })
}