<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '~/composables/utils';
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { type ButtonVariants, buttonVariants } from '.';
import { ReloadIcon } from '@radix-icons/vue';

interface Props extends PrimitiveProps {
    variant?: ButtonVariants['variant'];
    size?: ButtonVariants['size'];
    class?: HTMLAttributes['class'];
    href?: string;
    isLoading?: boolean;
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    as: 'button',
    isLoading: false,
    disabled: false,
});
</script>

<template>
    <template v-if="props.href">
        <NuxtLink :href="props.href" class="inline-block">
            <Primitive
                :as="as"
                :class="
                    cn(buttonVariants({ variant, size }), props.class, 'cursor-pointer', {
                        'pointer-events-none opacity-50': props.disabled || props.isLoading,
                    })
                "
                :disabled="props.disabled || props.isLoading"
            >
                <ReloadIcon class="mr-2 h-4 w-4 animate-spin" v-if="props.isLoading" />
                <slot />
            </Primitive>
        </NuxtLink>
    </template>
    <template v-else>
        <Primitive
            :as="as"
            :class="
                cn(buttonVariants({ variant, size }), props.class, 'cursor-pointer', {
                    'pointer-events-none opacity-50': props.disabled || props.isLoading,
                })
            "
            :disabled="props.disabled || props.isLoading"
        >
            <ReloadIcon class="mr-2 h-4 w-4 animate-spin" v-if="props.isLoading" />
            <slot />
        </Primitive>
    </template>
</template>
