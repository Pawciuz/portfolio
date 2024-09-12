<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { useGlobalState } from '@/lib/store/islandRotationState';
import IslandModel from '~/models/IslandModel.vue';
definePageMeta({
    keepalive: true,
});
useHead({
    title: 'Main page',
});
const isRotating: Ref<boolean> = ref(false);
const currentFocusPoint: Ref<number | null> = ref(null);
const globalState = useGlobalState();

const updateIsRotating = (value: boolean): void => {
    isRotating.value = value;
};
</script>

<template>
    <div class="relative h-[calc(100vh-80px)] overflow-hidden overscroll-none">
        <HomeInfo :current-stage="globalState.state.currentStage" class="absolute left-1/2 top-10 translate-x-[-50%]" />
        <KeepAlive>
            <IslandModel
                :is-rotating="isRotating"
                :current-focus-point="currentFocusPoint"
                @update:is-rotating="updateIsRotating"
            />
        </KeepAlive>
        <iframe
            class="z-9999 fixed bottom-[1vh] left-[50%] translate-x-[-50%] md:bottom-[5vh]"
            src="https://lottie.host/embed/06040897-ef6f-4cba-b68b-32060d75b16a/kRpsKPIEUE.json"
        />
    </div>
</template>
