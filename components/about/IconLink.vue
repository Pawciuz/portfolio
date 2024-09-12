<script setup lang="ts">
import { defineProps } from 'vue';
import type { LinkItem } from './types';

defineProps<{
    link: LinkItem;
}>();
</script>

<template>
    <a :href="link.url" target="_blank" rel="noreferrer" class="flex items-center justify-center">
        <img :src="link.icon" :alt="link.name" width="40" height="40" />
    </a>
</template>
