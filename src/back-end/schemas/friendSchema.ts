import { isValidObjectId } from 'mongoose';
import z from 'zod';
import { ErrorCatalog } from '../error';

const friendSchema = z.object({
  _id: z.string().refine(isValidObjectId, ErrorCatalog.INVALID_ID).optional(),
  name: z.string(),
  email: z.string().email(),
  secretFriend: z.string().refine(isValidObjectId, ErrorCatalog.INVALID_ID).optional(),
});

export default friendSchema;
