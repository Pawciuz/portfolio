<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { ReloadIcon } from '@radix-icons/vue'

interface Props extends /* @vue-ignore */ PrimitiveProps {
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    class?: HTMLAttributes['class']
    href?: string
    isLoading?: boolean
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    as: 'button',
    isLoading: false,
    disabled: false
})
</script>

<template>
    <Primitive
        :as="as"
        :class="
            cn(
                buttonVariants({ variant, size }),
                props.class,
                'cursor-pointer',
                {
                    'pointer-events-none opacity-50':
                        props.disabled || props.isLoading,
                },
            )
        "
    >
        <ReloadIcon class="w-4 h-4 mr-2 animate-spin" v-if="props.isLoading" />
        <template v-if="props.href">
            <NuxtLink :href="props.href" class="w-full h-full inline-block">
                <slot />
            </NuxtLink>
        </template>
        <template v-else>
            <slot />
        </template>
    </Primitive>
</template>
