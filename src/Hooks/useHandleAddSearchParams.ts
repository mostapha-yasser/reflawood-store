"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const useHandleAddSearchParams = () => {
  const [query,setQuery]=useState("")
    const searchParams = useSearchParams();
  const router = useRouter();


  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if(name==="q"){
        setQuery(value)
      }
      if (value.trim() === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const updateSearchParams = useCallback(
    (name: string, value: string) => {
      const queryString = createQueryString(name, value);

      router.push(`?${queryString}`);
    },
    [createQueryString, router]
  );
  const deleteSearchParams = useCallback(() => {
    setQuery("")
    router.push(`?`);
  }, [router]);

  return {
    updateSearchParams,
    deleteSearchParams,
    query
  };
};

export default useHandleAddSearchParams;
