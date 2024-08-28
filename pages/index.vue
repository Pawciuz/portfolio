<script setup lang="ts">
import { type Ref, ref } from 'vue'
import IslandModel from '~/models/IslandModel.vue'
const isRotating: Ref<boolean> = ref(false)
const currentStage: Ref<number | null> = ref(null)
const currentFocusPoint: Ref<object | null> = ref(null)

const updateIsRotating = (value: boolean): void => {
    isRotating.value = value
}

const updateCurrentStage = (value: number | null): void => {
    currentStage.value = value
}
</script>

<template>
    <div class="h-[calc(100vh-80px)] relative overflow-hidden">
        <HomeInfo
            :currentStage="currentStage"
            class="absolute left-1/2 translate-x-[-50%] top-10"
        />
        <IslandModel
            :isRotating="isRotating"
            :currentFocusPoint="currentFocusPoint"
            @update:isRotating="updateIsRotating"
            @update:currentStage="updateCurrentStage"
        />
        <iframe
            class="fixed z-9999 left-[50%] bottom-[5vh] translate-x-[-50%]"
            src="https://lottie.host/embed/06040897-ef6f-4cba-b68b-32060d75b16a/kRpsKPIEUE.json"
        />
    </div>
</template>
