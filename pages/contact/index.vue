<script setup lang="ts">
import type { EmailForm } from '~/components/contact/form/types';
import { useToast } from '@/components/ui/toast/use-toast';
import { useMail } from '#imports';
const mail = useMail();
const { toast } = useToast();
let isLoading = false;
const sendEmail = async (values: EmailForm) => {
    try {
        isLoading = true;
        await mail.send({
            subject: values.title,
            text: values.description,
        });
        toast({
            title: 'Message sent',
        });
    } catch (error) {
        console.error('Failed to send email:', error);
        alert('Failed to send email. Please try again.');
    }
};
</script>
<template>
    <div>
        <h1 class="mb-10 w-full text-center text-3xl font-bold text-blue-900">Contact me</h1>
        <ContactForm :on-submit="sendEmail" :is-loading="isLoading" />
    </div>
</template>
