<template>
    <div
        class="project-card w-full rounded-xl bg-gradient-to-tl from-sky-100 from-10% via-sky-200 via-75% to-sky-300 to-100% p-10 shadow-[inset_0_0_10px_2px_rgba(59,130,246,0.5)] transition-all"
    >
        <h1 class="font-display mb-4 w-full text-center text-3xl font-bold text-blue-600">
            {{ project.name }}
        </h1>

        <div class="m-10">
            <Carousel class="mx-auto w-full">
                <CarouselContent>
                    <CarouselItem
                        v-for="(image, index) in project.images"
                        :key="index"
                        class="flex items-center justify-center p-1"
                    >
                        <div class="p-1">
                            <img
                                :src="image"
                                :alt="`Project image ${index + 1}`"
                                class="max-h-[400px] w-full cursor-pointer rounded-xl object-contain"
                                @click="openDialog(image)"
                            />
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

        <div class="flex flex-col md:flex-row md:space-x-6">
            <div v-if="project.technologies" class="w-full md:w-1/2">
                <div class="animate-fade-in mb-4">
                    <h2 class="font-display mb-2 text-xl font-semibold text-blue-600">Technologies & Tools</h2>
                    <ul class="font-body list-inside list-disc">
                        <li
                            v-for="(tech, index) in project.technologies"
                            :key="index"
                            class="text-gray-600 transition-colors duration-300 hover:text-indigo-500"
                        >
                            {{ tech }}
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="project.features" class="w-full md:w-1/2">
                <div class="animate-fade-in mb-4" style="animation-delay: 0.2s">
                    <h2 class="font-display mb-2 text-xl font-semibold text-blue-600">Features</h2>
                    <ul class="font-body list-inside list-disc">
                        <li
                            v-for="(feature, index) in project.features"
                            :key="index"
                            class="text-gray-600 transition-colors duration-300 hover:text-indigo-500"
                        >
                            {{ feature }}
                        </li>
                    </ul>
                </div>
                <div v-if="project.methodology" class="animate-fade-in mb-4" style="animation-delay: 0.4s">
                    <h2 class="font-display mb-2 text-xl font-semibold text-blue-600">Methodology</h2>
                    <p class="font-body text-gray-600">{{ project.methodology }}</p>
                </div>
                <div v-if="project.team" class="animate-fade-in" style="animation-delay: 0.6s">
                    <h2 class="font-display mb-2 text-xl font-semibold text-blue-600">Team</h2>
                    <p class="font-body text-gray-600">{{ project.team }}</p>
                </div>
            </div>
        </div>
    </div>
    <Dialog
        v-model:open="dialogOpen"
        class="fixed inset-0 flex items-center justify-center p-4"
        @close="dialogOpen = false"
    >
        <DialogContent class="flex min-w-[80vw] flex-col items-center justify-center">
            <DialogHeader>
                <DialogTitle>{{ dialogTitle }}</DialogTitle>
            </DialogHeader>
            <img :src="dialogImage" class="h-full object-contain" />
            <DialogFooter class="w-full">
                <button type="button" @click="dialogOpen = false" class="btn">Close</button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ProjectData {
    name: string;
    technologies: string[];
    features: string[];
    methodology: string;
    team: string;
    images: string[];
}

defineProps({
    project: {
        type: Object as PropType<ProjectData>,
        required: true,
    },
});
const dialogOpen = ref(false);
const dialogImage = ref('');
const dialogTitle = ref('');

const openDialog = (image: string) => {
    dialogImage.value = image;
    dialogTitle.value = 'Project Image';
    dialogOpen.value = true;
};
</script>

<style scoped>
.font-display {
    font-family: 'Poppins', sans-serif;
}

.font-body {
    font-family: 'Roboto', sans-serif;
}

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

.animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
    opacity: 0;
}

/* Responsywność karuzeli */
@media (max-width: 640px) {
    .carousel-image {
        height: 300px; /* Dostosuj wysokość dla mniejszych ekranów */
    }
}
</style>
