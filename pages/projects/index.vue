<template>
    <div class="flex flex-col gap-5 pb-5">
        <ProjectsProjectCard v-for="project in projects" :key="project.name" :name="project.name" :project="project" />
    </div>
</template>

<script setup>
const projects = [
    {
        name: 'V-Journal',
        technologies: [
            'React',
            'Next.js',
            'Shadcn',
            'TailwindCSS',
            'TanStack (Query, Table)',
            'Firebase',
            'drag-and-drop (dnd)',
            'Zustand',
            'Zod',
            'React-Hook-Forms',
            'OpenAI API',
            'Gitlab',
        ],
        features: [
            'Responsive Web Design (RWD)',
            'Real-time drag-and-drop task management in a Kanban board',
            'Generic table with database filters and pagination',
            'Integration with OpenAI API for advanced features',
        ],
        methodology:
            'Agile methodology with daily meetings (Daily Scrum) to ensure continuous improvement and collaboration.',
        team: 'Worked in a large, multidisciplinary team of developers to deliver high-quality software solutions.',
        images: Array.from({ length: 7 }, (_, i) => `/v-journal/image${i + 1}.png`),
    },
    {
        name: 'motoave.eu',
        technologies: ['Angular', 'SCSS', 'Firebase', 'Leaflet', 'TailwindCSS', 'Figma'],
        features: ['Responsive Web Design (RWD)', 'Location map with markers', 'Infinity locations scroll'],
        team: 'Worked with UI designer and 2 full-stack developers',
        images: Array.from({ length: 4 }, (_, i) => `/motoave/image${i + 1}.png`),
    },
    {
        name: 'wellbefore.com',
        technologies: ['Blender'],
        features: ['Making renders of products in Blender'],
        images: Array.from({ length: 3 }, (_, i) => `/wellbefore/image${i + 1}.png`),
    },
    {
        name: 'myseema.com',
        technologies: ['HTML', 'CSS', 'JavaScript (JQuery)', 'nanogen', 'SplideJs'],
        features: ['Advanced responsive design', 'SplideJs custom carousels with breakpoints'],
        methodology: 'Agile methodology with constant client collaboration',
        images: Array.from({ length: 4 }, (_, i) => `/myseema/image${i + 1}.png`),
    },
];
</script>
