/* eslint-disable no-console */
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { apiRouter } from "./routers/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message ?? "Something went wrong";
    res.status(status).json({ status, message });
});

process.on("uncaughtException", (err) => {
    console.log("uncaughtException:", err);
    process.exit(1);
});

const dbConnection = async () => {
    let dbConnect = false;

    while (!dbConnect) {
        try {
            console.log("Connecting to DB...");
            await mongoose.connect(config.MONGO_URI!);
            dbConnect = true;
            console.log("Database available!!!");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            console.log("Database unavailable, wait 3 seconds");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

const startServer = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, () =>
            console.log(`Server started on port ${config.PORT}`),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer().catch(console.log);
