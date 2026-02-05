'use client'
import LoadingSpin from "@/components/loading-spin";
import Pagination from "@/components/pagination";
import PokemonCard from "@/components/pokemon-card";
import { usePokemonList } from "@/hooks/usePokemon";
import { useRouter, useSearchParams } from "next/navigation";

export default function ListPokemon() {
  const PAGE_SIZE = 20
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search");
  const { data, isLoading, isError } = usePokemonList(PAGE_SIZE, PAGE_SIZE * (page - 1), search)
  const router = useRouter()
  return (
    <div className="space-y-5">
      {
        isError ?
          <div className="flex justify-center">
            <div className="flex flex-col">
              <div className="text-gray-500">
                Error not found
              </div>
              <button onClick={() => router.push("?")} className="bg-[#3D3D8A] p-2 rounded-full shadow-lg hover:shadow-xl hover:bg-[#3D3D8A]/90 cursor-pointer">Back</button>
            </div>
          </div>
          :
          isLoading ?
            <LoadingSpin />
            :
            // {/* card pokemon */}
            <>
              <div className="grid grid-cols-4 gap-4 max-sm:gap-2 max-sm:grid-cols-3">
                {
                  data?.results.map((item) => (
                    <PokemonCard item={item} key={item.id} colors={item.colors} />
                  ))
                }
              </div>
              <Pagination
                total={data?.count ?? 0}
                pageSize={PAGE_SIZE}
                currentPage={page}
              />
            </>

      }
    </div>
  );
}
