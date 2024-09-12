<script setup lang="ts">
import type { EmailForm } from './types';
import { useForm } from 'vee-validate';
import { formSchema } from './formSchema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const props = defineProps<{
    onSubmit: (values: EmailForm) => void;
    isLoading: boolean;
}>();
const form = useForm({
    validationSchema: formSchema,
});

const handleSubmit = form.handleSubmit((values) => {
    console.log(values);
    props.onSubmit(values);
});
</script>

<template>
    <form class="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg" @submit="handleSubmit">
        <FormField v-slot="{ componentField }" name="title">
            <FormItem class="mb-4">
                <FormLabel class="mb-1 block text-sm font-medium text-gray-700">Title</FormLabel>
                <FormControl>
                    <Input
                        type="text"
                        placeholder="Enter title"
                        v-bind="componentField"
                        class="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                </FormControl>
                <FormMessage class="mt-1 text-sm text-red-500" />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
            <FormItem class="mb-4">
                <FormLabel class="mb-1 block text-sm font-medium text-gray-700">Description</FormLabel>
                <FormControl>
                    <Input
                        type="text"
                        placeholder="Enter description"
                        v-bind="componentField"
                        class="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                </FormControl>
                <FormMessage class="mt-1 text-sm text-red-500" />
            </FormItem>
        </FormField>

        <Button
            type="submit"
            class="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
            :is-loading="props.isLoading"
        >
            Send
        </Button>
    </form>
</template>
