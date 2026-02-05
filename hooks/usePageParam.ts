import { useSearchParams } from "next/navigation";

export function usePageParam() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  return page;
}