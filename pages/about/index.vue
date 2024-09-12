<script setup lang="ts">
import { technologies, tools } from '~/components/about/constants';
useHead({
    title: 'About',
});
</script>
<template>
    <div
        class="grid w-full grid-cols-1 gap-6 rounded-xl bg-gradient-to-tl from-sky-100 from-10% via-sky-200 via-75% to-sky-300 to-100% p-10 shadow-[inset_0_0_10px_2px_rgba(59,130,246,0.5)] md:grid-cols-2"
    >
        <div class="mb-6 flex justify-center fade-in md:mb-0" style="animation-delay: 0.1s">
            <img src="/main-photo.jpeg" class="w-[300px] rounded-full border-4 border-blue-300" alt="Profile Photo" />
        </div>
        <div class="fade-in" style="animation-delay: 0.3s">
            <h1 class="mb-2 text-3xl font-bold text-blue-900">Paweł Podgórski</h1>
            <h3 class="mb-4 text-xl font-semibold text-blue-700">Front-End Developer</h3>
            <p class="mb-6 text-gray-700">
                Hello! I'm Paweł Podgórski, a passionate Front-End Developer with experience in creating dynamic and
                responsive web applications. I specialize in Frontend, with a keen eye for design and user experience. I
                enjoy solving complex problems and continuously learning new technologies to enhance my skill set.
            </p>
        </div>
        <div class="fade-in" style="animation-delay: 0.8s">
            <h2 class="mb-4 text-2xl font-bold text-blue-900">Technologies</h2>
            <div class="flex flex-wrap gap-2">
                <AboutIconLink v-for="tech in technologies" :key="tech.name" :link="tech" />
            </div>
        </div>
        <div class="fade-in" style="animation-delay: 0.8s">
            <h2 class="mb-4 text-2xl font-bold text-blue-900">Tools</h2>
            <div class="flex flex-wrap gap-2">
                <AboutIconLink v-for="tool in tools" :key="tool.name" :link="tool" />
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.8s ease-out forwards;
    opacity: 0;
}
</style>
