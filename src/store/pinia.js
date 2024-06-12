import { defineStore } from 'pinia'

export const useStore = defineStore('useStore', {
    state: () => {
        return {
            gridPopulation: 20,
            gridColumns: 6,
            gridRows: 3
        }
    },

    actions: {
        updateGridPopulation(value){

            if (value > 0)
                this.gridPopulation = value

        }
    }
})