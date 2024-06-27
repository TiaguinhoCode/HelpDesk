import { atom } from "recoil";

export const serchFilter = atom<string>({
    key: "serchFilter",
    default: ''
})