import { User } from "./user";

export type Host = {
  id: string;
  host: string;
  processor: string;
  ram_memory: string;
  hdd: boolean;
  sdd: boolean;
  storage: string;
  system: string;
  switch: string;
  user: User;
};
