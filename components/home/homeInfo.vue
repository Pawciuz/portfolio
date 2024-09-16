<script setup lang="ts">
import AnimatedCard from '~/components/home/AnimatedCard/AnimatedCard.vue';

const props = defineProps<{
    currentStage: number | null;
    class: string;
}>();
</script>

<template>
    <div :class="props.class">
        <div v-if="props.currentStage === 1">
            <AnimatedCard heading="Hi, I'm Pawel 👋" paragraph="A Software Engineer from Poland" />
        </div>

        <div v-if="props.currentStage === 2">
            <AnimatedCard
                button-text="Learn about me"
                button-href="/about"
                heading="Has lot of skills and experience"
                paragraph="Want to know more?"
            />
        </div>

        <div v-if="props.currentStage === 3">
            <AnimatedCard
                heading="Led multiple projects to success"
                paragraph="Curious about the impact?"
                button-text="Visit my portfolio"
                button-href="/projects"
            />
        </div>

        <!-- Stage 4 -->
        <div v-if="props.currentStage === 4">
            <AnimatedCard
                heading="Need a project done or looking for a dev?"
                paragraph="I'm just a few keystrokes away"
                button-text="Let's talk"
                button-href="/contact"
            />
        </div>
    </div>
</template>
