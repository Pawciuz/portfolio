<template>
    <div class="container mx-auto">
        <header
            class="flex h-20 justify-between items-center py-4 mx-auto top-0 z-10 right-0 left-0"
        >
            <Button href="/" class="">PP</Button>

            <nav class="flex text-lg gap-7 font-medium">
                <Button href="/about" variant="link">About</Button>
                <Button href="/projects" variant="link">Projects</Button>
            </nav>
        </header>
        <slot />
    </div>
</template>
