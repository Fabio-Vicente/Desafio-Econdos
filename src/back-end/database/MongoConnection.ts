import mongoose from 'mongoose';

const mongoDBPort = process.env.MONGOPORT?.toString();
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const URL: string = `mongodb://localhost:${mongoDBPort}/eCondosFriends`;

export default async function connectDatabse(): Promise<void> {
  await mongoose.connect(URL);
}
