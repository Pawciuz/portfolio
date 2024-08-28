<script setup lang="ts">
import { Button } from '~/components/ui/button'

const props = defineProps<{
    heading: string
    paragraph: string
    buttonText?: string
    buttonHref?: string
    class?: string
}>()
</script>

<template>
    <div :class="['relative', 'card-container', 'min-w-[300px]', props.class]">
        <div
            class="absolute inset-0 -z-10 bg-gradient-to-br from-[#B0E2FF] to-[#D4F1F4] rounded-2xl shadow-lg"
        />
        <div
            class="bg-white p-6 rounded-2xl shadow-lg text-center transform-gpu transition-transform duration-500 ease-in-out hover:animate-none animate-translate"
        >
            <h2
                class="text-3xl mb-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0057FF] to-[#4682B4]"
            >
                {{ heading }}
            </h2>
            <p class="text-lg mb-4">
                {{ paragraph }}
            </p>
            <Button
                v-if="buttonText && buttonHref"
                :href="buttonHref"
                variant="homeInfo"
            >
                {{ buttonText }}
            </Button>
        </div>
    </div>
</template>

<style scoped>
@keyframes translate {
    0% {
        transform: translate(0, 0);
    }
    50% {
        transform: translate(-10px, 10px);
    }
    100% {
        transform: translate(0, 0);
    }
}

.animate-translate {
    animation: translate 3s ease-in-out infinite;
}

.card-container:hover .animate-translate {
    animation: none;
}
</style>
