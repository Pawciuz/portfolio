<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const isActiveRoute = (path) => route.path === path;
</script>

<template>
    <div class="container mx-auto">
        <header class="left-0 right-0 top-0 z-10 mx-auto flex h-20 items-center justify-between py-4">
            <Button href="/">PP</Button>

            <nav class="flex gap-7 text-lg font-medium">
                <!-- Apply the "active" class conditionally based on the current route -->
                <Button href="/about" variant="link" :class="{ 'text-blue-500': isActiveRoute('/about') }">
                    About
                </Button>
                <Button href="/projects" variant="link" :class="{ 'text-blue-500': isActiveRoute('/projects') }">
                    Projects
                </Button>
            </nav>
        </header>
        <slot />
    </div>
</template>

<style scoped>
.text-blue-500 {
    font-weight: bold;
}
</style>
