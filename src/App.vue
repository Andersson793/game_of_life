<script>
import AppButton from './components/AppButton.vue';
import AppGridGame from './components/AppGridGame.vue';
import AppInput from './components/AppInput.vue';
import AppSelect from './components/AppSelect.vue';
import { useStore } from './store/pinia';

export default {

    data(){
        return{
            store: useStore()
        }
    },

    components: {
        AppButton,
        AppInput,
        AppSelect,
        AppGridGame
    }
}
</script>
<template>
    <main class="grid grid-cols-2">
        <AppGridGame/>
        <div id="options">

            <div class="m-auto w-fit">

                <AppInput />

                <AppSelect/>

                <AppButton/>
            </div>

        </div>
    </main>
</template>