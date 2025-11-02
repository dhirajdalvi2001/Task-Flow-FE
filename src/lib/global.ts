import { atomWithStorage } from "jotai/utils";
import type { UserDetails } from "./types";

export const userDetailsAtom = atomWithStorage<UserDetails | null>(
  "userDetails",
  null
);
