"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDb_1 = __importDefault(require("../dataBase/userDb"));
const passport_1 = __importDefault(require("passport"));
const local_1 = __importDefault(require("../strategies/local"));
const router = express_1.default.Router();
(0, local_1.default)(passport_1.default, (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userDb_1.default.findOne({ email });
}), (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    return yield userDb_1.default.findOne({ _id: id });
}));
router.post("/login", (req, res, next) => {
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err)
            throw err;
        if (!user)
            res.status(404).send(info);
        else {
            req.logIn(user, (err) => {
                if (err)
                    throw err;
                res.status(200).send("Successfully Authenticated");
                console.log(req.user);
            });
        }
    })(req, res, next);
});
router.get("/redirect", (req, res) => {
    res.redirect(`http://localhost:3000/`);
});
router.get("/failed", (req, res) => {
    res.redirect(`http://localhost:3000/login`);
});
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Register");
        const { password, userName, email } = req.body;
        console.log(req.body);
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const createUser = yield userDb_1.default.create({
            userName,
            password: hashedPassword,
            email,
        });
        console.log(createUser);
        res.status(200).send(createUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ err, message: "Failed" });
    }
}));
router.get("/logout", (req, res) => {
    if (req.user) {
        console.log(`LOGED OUT`);
        req.session.destroy();
        res.status(200).send({ msg: "logedOut" });
    }
    else {
        res.status(404).send({ msg: "unAuthorized" });
    }
});
router.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        res.status(200).send(yield req.user);
    }
    else {
        res.status(404).send({ err: "unAuthorized" });
    }
}));
exports.default = router;
