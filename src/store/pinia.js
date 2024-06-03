import { defineStore } from 'pinia'

export const useStore = defineStore('useStore', {
    state: () => {
        return {
            gridColumns: 100,
            gridRows: 100
        }
    }
})