import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, './.env') });
import User from './server/models/User.js';

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    try {
      // Find latest eleve created
      const user = await User.findOne({ role: 'eleve' }).sort({ createdAt: -1 });
      console.log('LATEST ELEVE:', user);
      
      const loginTry = await User.findOne({ 
        $or: [{ email: user.identifiant }, { identifiant: user.identifiant }]
      });
      console.log('LOGIN QUERY RESULT:', loginTry);
      
    } catch (err) {
      console.log(err);
    }
    process.exit(0);
  });
