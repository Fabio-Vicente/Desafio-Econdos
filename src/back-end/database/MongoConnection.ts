import 'dotenv/config';
import mongoose from 'mongoose';

const mongoDBPort = process.env.MONGOPORT?.toString();
const mongoDBHost = process.env.MONGOHOST?.toString();
const mongoDBPassword = process.env.MONGOPASSWORD?.toString();
const mongoDBUser = process.env.MONGOUSER?.toString();

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const URL: string = `mongodb://${mongoDBUser}:${mongoDBPassword}@${mongoDBHost}:${mongoDBPort}`;

export default async function connectDatabse(): Promise<void> {
  await mongoose.connect(URL);
}
