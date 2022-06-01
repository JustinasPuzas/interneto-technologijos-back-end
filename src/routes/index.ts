import express from "express";
import authRouter from "./auth";

const router = express.Router();

router.use("/auth", authRouter);

router.get("/test", (req: any, res: any, next: Function) => {
    res.status(200).send("Testing");
})

export default router;