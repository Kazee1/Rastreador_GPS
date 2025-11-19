import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const key = crypto.createHash('sha256').update(process.env.KEY).digest();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadFolder = path.join(__dirname, "../uploads");

export { key, uploadFolder };
