"use client";

import { titleAtom } from "atoms/form";
import { useAtomValue } from "jotai";

const Title = () => {
  const title = useAtomValue(titleAtom);

  return <div>{title}</div>;
};

export { Title };
