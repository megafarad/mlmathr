import {allItems} from "./modules.tsx";

export const lookupXp = (itemId: string) => {
    const xp= allItems.find(item => item.id === itemId)?.xp
    return xp ? xp : 0
}