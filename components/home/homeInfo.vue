<script setup lang="ts">
import AnimatedCard from '~/components/home/AnimatedCard/AnimatedCard.vue'

const props = defineProps<{
    currentStage: number | null;
    class: string;
}>()
</script>

<template>
    <div :class="props.class">
        <!-- Stage 1 -->
        <div v-if="props.currentStage === 1">
            <AnimatedCard
                heading="Hi, I'm Pawel 👋"
                paragraph="A Software Engineer from Poland"
            />
        </div>

        <!-- Stage 2 -->
        <div v-if="props.currentStage === 2">
            <AnimatedCard
                heading="Worked with many companies"
                paragraph="Picked up many skills along the way"
                buttonText="Learn more"
                buttonHref="/about"
            />
        </div>

        <!-- Stage 3 -->
        <div v-if="props.currentStage === 3">
            <AnimatedCard
                heading="Led multiple projects to success"
                paragraph="Curious about the impact?"
                buttonText="Visit my portfolio"
                buttonHref="/projects"
            />
        </div>

        <!-- Stage 4 -->
        <div v-if="props.currentStage === 4">
            <AnimatedCard
                heading="Need a project done or looking for a dev?"
                paragraph="I'm just a few keystrokes away"
                buttonText="Let's talk"
                buttonHref="/contact"
            />
        </div>

        
    </div>
</template>

