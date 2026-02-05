import { api } from "./api"
import { getAllSpecies, getPokemonExtra } from "./helper"
import { flavorTextEntries, genus } from "./type"
export const getPokemonList = async (params?: {
    limit?: number
    offset?: number
    query?: string | null
}) => {
    try {
        if (params?.query) {
            const { data } = await api.get(`pokemon/${params.query.toLocaleLowerCase()}`)
            const extra = await getPokemonExtra(data?.id)

            return {
                data: {
                    count: 1,
                    next: null,
                    previous: null,
                    results: [
                        {
                            id: data?.id,
                            name: data?.name,
                            url: "",
                            ...extra
                        }

                    ]
                }
            }
        } else {
            const { data } = await api.get('pokemon', {
                params: {
                    limit: params?.limit ?? 20,
                    offset: params?.offset ?? 0
                }
            })
            // console.log("pokemon = ", data)
            const detailedPokemon = await Promise.all(
                data.results.map(async (item: any) => {
                    const id = Number(item.url.split("/").at(-2));
                    const extra = await getPokemonExtra(id);

                    return {
                        ...item,
                        id,
                        ...extra,
                    };
                })
            );
            return {
                data: {
                    ...data,
                    results: detailedPokemon,
                }
            };
        }
    } catch (error) {
        throw new Error(`${error}`)
    }

}

export default async function getDetailPokemon(name: string) {
  try {
    // pokemon detail
    const { data } = await api.get(`/pokemon/${name}`);

    // species
    const { data: species } = await api.get(`/pokemon-species/${name}`);

    // evolution chain
    const { data: evolutionChain } = await api.get(
      species.evolution_chain.url
    );

    const chain = getAllSpecies(evolutionChain?.chain);

    const evolutionImg = await Promise.all(
      chain.map(async (item : any) => {
        const path = new URL(item.url).pathname.split("/");
        const id = Number(path[path.length - 2]);

        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        return { ...item, image };
      })
    );

    const genera = species.genera.find(
      (item: genus) => item.language.name === "en"
    );

    const flavorTextEntries = species.flavor_text_entries.find(
      (item: flavorTextEntries) =>
        item.language.name === "en" && item.version.name === "red"
    );

    const detailPokemonData = {
      ...data,
      genera,
      flavorTextEntries,
      evolution: evolutionImg,
      color: species,
    };

    return detailPokemonData;
  } catch (error) {
    throw new Error("An error occurred while fetching pokemon detail");
  }
}