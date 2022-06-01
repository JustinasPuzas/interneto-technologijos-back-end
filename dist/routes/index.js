"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const router = express_1.default.Router();
router.use("/auth", auth_1.default);
router.get("/test", (req, res, next) => {
    res.status(200).send("Testing");
});
exports.default = router;
