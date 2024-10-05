<script setup lang="ts">
defineProps<{
    progress: number;
}>();
</script>
<template>
    <div class="h-6 w-64 overflow-hidden rounded-full bg-gray-200">
        <div class="h-full bg-blue-500 transition-all duration-300 ease-out" :style="{ width: `${progress}%` }" />
    </div>
</template>
