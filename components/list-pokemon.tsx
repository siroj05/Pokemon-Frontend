'use client'
import LoadingSpin from "@/components/loading-spin";
import Pagination from "@/components/pagination";
import PokemonCard from "@/components/pokemon-card";
import { usePokemonList } from "@/hooks/usePokemon";
import { useSearchParams } from "next/navigation";
import ErrorHandler from "./error-handler";

export default function ListPokemon() {
  const PAGE_SIZE = 20
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search");
  const { data, isLoading, isError } = usePokemonList(PAGE_SIZE, PAGE_SIZE * (page - 1), search)

  if (isLoading) {
    return <LoadingSpin />
  }
  if (isError) {
    return <ErrorHandler />
  }

  return (
    <div className="space-y-5">
      // {/* card pokemon */}
      <>
        <div className="grid grid-cols-4 gap-4 max-sm:gap-2 max-sm:grid-cols-3">
          {
            data?.results.map((item) => (
              <PokemonCard item={item} key={item.id} colors={item.colors} />
            ))
          }
        </div>
        {/* pagination */}
        <Pagination
          total={data?.count ?? 0}
          pageSize={PAGE_SIZE}
          currentPage={page}
        />
      </>
    </div>
  );
}
