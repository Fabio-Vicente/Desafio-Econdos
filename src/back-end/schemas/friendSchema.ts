import { isValidObjectId } from 'mongoose';
import z from 'zod';

const friendSchema = z.object({
  _id: z.string().refine(isValidObjectId, 'Invalid id').optional(),
  name: z.string(),
  email: z.string().email(),
  secretFriend: z.string().refine(isValidObjectId, 'Invalid id').optional(),
});

export default friendSchema;
