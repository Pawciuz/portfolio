import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

const formSchema = toTypedSchema(
    z.object({
        title: z.string().min(2).max(50),
        description: z.string().min(2),
    }),
);
export { formSchema };
