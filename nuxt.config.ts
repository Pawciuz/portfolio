// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            to: process.env.MAIL_TO,
            user: process.env.SMTP_HOST,
            pass: process.env.SMTP_PASS,
        },
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
        '@tresjs/nuxt',
        '@nuxt/eslint',
        '@nuxt/icon',
        [
            'nuxt-mail',
            {
                message: {
                    to: process.env.MAIL_TO,
                },
                smtp: {
                    service: 'gmail',
                    auth: {
                        user: process.env.SMTP_HOST,
                        pass: process.env.SMTP_PASS,
                    },
                },
            },
        ],
    ],

    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './components/ui',
    },

    compatibilityDate: '2024-08-21',
    typescript: {
        strict: true,
        typeCheck: true,
    },
    nitro: {
        prerender: {
            routes: ['/about', '/projects', '/'],
        },
    },
});
