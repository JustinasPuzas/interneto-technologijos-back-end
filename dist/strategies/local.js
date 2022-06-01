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
const passport_local_1 = __importDefault(require("passport-local"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDb_1 = __importDefault(require("../dataBase/userDb"));
const initialize = (passport, getUserByEmail, getUserById) => {
    const authenticateUser = (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield getUserByEmail(email);
        console.log(user);
        if (user == null) {
            console.log("No user with that email");
            return done(null, false, { message: "No user with that email" });
        }
        try {
            if (yield bcrypt_1.default.compare(password, user.password)) {
                return done(null, user);
            }
            else {
                return done(null, false, { message: "Password Incorect" });
            }
        }
        catch (err) {
            return done(err);
        }
    });
    passport.use(new passport_local_1.default.Strategy({ usernameField: "username", passwordField: "password" }, authenticateUser));
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        userDb_1.default.findOne({ _id: id }, (err, user) => {
            const userInformation = {
                id: user === null || user === void 0 ? void 0 : user._id,
                username: user === null || user === void 0 ? void 0 : user.email,
                nickname: user === null || user === void 0 ? void 0 : user.userName
            };
            cb(null, userInformation);
        });
    });
};
exports.default = initialize;
