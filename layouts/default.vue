<template>
    <div class="container mx-auto">
        <header class="left-0 right-0 top-0 z-10 mx-auto flex h-20 items-center justify-between py-4">
            <Button href="/">PP</Button>

            <nav class="flex gap-7 text-lg font-medium">
                <Button href="/about" variant="link">About</Button>
                <Button href="/projects" variant="link">Projects</Button>
            </nav>
        </header>
        <slot />
    </div>
</template>
