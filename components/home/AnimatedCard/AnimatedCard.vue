<script setup lang="ts">
const props = defineProps<{
    heading: string;
    paragraph: string;
    buttonText?: string;
    buttonHref?: string;
    class?: string;
}>();
</script>

<template>
    <div :class="['relative', 'card-container', 'min-w-[300px]', props.class]">
        <div class="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#B0E2FF] to-[#D4F1F4] shadow-lg" />
        <div class="translate-x-2 translate-y-2 rounded-2xl bg-white p-6 text-center shadow-lg">
            <h2
                class="mb-2 bg-gradient-to-r from-[#0057FF] to-[#4682B4] bg-clip-text text-3xl font-extrabold text-transparent"
            >
                {{ heading }}
            </h2>
            <p class="mb-4 text-lg">
                {{ paragraph }}
            </p>
            <Button v-if="buttonText && buttonHref" :href="buttonHref" variant="homeInfo">
                {{ buttonText }}
            </Button>
        </div>
    </div>
</template>
