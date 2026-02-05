import { create } from "zustand"

interface StoreModel {
    searchIsDialogOpen : boolean
    setSearchIsDialogOpen : (value : boolean) => void
}

export const useStore = create<StoreModel>((set) => ({
    searchIsDialogOpen : false,
    setSearchIsDialogOpen : (value : boolean) => {
        set({
            searchIsDialogOpen : value
        })
    }
}))