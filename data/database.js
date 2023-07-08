import mongoose from 'mongoose';

export const connectDB = (dbName) => {
    mongoose.connect(process.env.MONGO_URI, { dbName })
        .then(()=>{ console.log('Connected to database...') })
        .catch((e)=>{ console.log(e) })
}