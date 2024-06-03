<script>
import AppButton from './components/AppButton.vue';
import AppInput from './components/AppInput.vue';
import AppSelect from './components/AppSelect.vue';

export default {

    components: {
        AppButton,
        AppInput,
        AppSelect
    }
}
</script>
<template>
    <main class="grid grid-cols-2">
        <div id="conteiner">
            
        </div>
        <div id="options">

            <div class="m-auto w-fit">

                <div class="inline-flex">
                    <AppInput/>
                    <AppInput />
                </div>

                <AppSelect/>

                <AppButton/>
            </div>

        </div>
    </main>
</template>