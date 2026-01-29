

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: "/Users/sadi_/Coding/blockchain/.env"});

const uri = process.env.MONGODB_URI;

export const connect = async () => {
    try {
        if(uri) {
            await mongoose.connect(uri);
            const connection = mongoose.connection;

            connection.on("connected" , () => {
                console.log("Connected to MongoDB")
            })

            connection.on("error" , (err) => {
                console.log("Error connecting to MongoDB", err)
            })

        }

    } catch (error) {
        console.log(error)
    }
}

