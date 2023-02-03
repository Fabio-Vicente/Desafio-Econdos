import z from 'zod';

const friendSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export default friendSchema;
