
import create from "zustand";
import { persist } from "zustand/middleware"

let AppStore = (set) => ({
  doOpen: true,
  updateOpen: (doOpen) => set((state) => ({ doOpen: doOpen })),
})
AppStore = persist(AppStore, { name: 'dsdasdasd' })
export const useAppStore = create(AppStore)
