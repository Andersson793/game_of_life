<script>
import { mask } from '@ionited/mask-vue';
import { useStore } from '../store/pinia';

export default {

  data(){
    return{
      store: useStore()
    }
  },

  mounted(){

  },

  methods: {

    handleChange(v){

      console.log(v)

    }

  },

  directives: { mask }

}
</script>

<template>
  <div>

    <div>
      <strong>Set the grid population.</strong>
    </div>
    <!--change the component -->
    <div>
      <input id="gridSize" v-mask="{mask: '99'}" class="shadow-md px-8 py-4 mr-5 mt-5 w-32 rounded-sm bg-slate-100" @change="(e) => store.updateGridPopulation(e.target.value)" :value="store.gridPopulation">
      </input>
    </div>

  </div>
</template>
