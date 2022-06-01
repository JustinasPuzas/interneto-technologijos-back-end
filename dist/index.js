"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const passport_1 = __importDefault(require("passport"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("./config"));
const express_flash_1 = __importDefault(require("express-flash"));
const app = (0, express_1.default)();
const PORT = 5000;
mongoose_1.default.connect("mongodb://localhost/internetoTechnologijos");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const corsSettings = {
    origin: `http://localhost:3000`,
    credentials: false, // set to true
};
app.use((0, cors_1.default)(corsSettings));
app.use((0, express_flash_1.default)());
app.use((0, express_session_1.default)({
    secret: `${process.env.SESSION_KEY}`,
    cookie: {
        maxAge: 60000 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    store: new connect_mongo_1.default({ mongoUrl: `${config_1.default.url.DataBase}` }),
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(`/api`, routes_1.default);
// app.use('/graphql', expressGraphQL.graphqlHTTP({
//   schema: MyGraphQLSchema,
//   graphiql: true,
// }),)
app.listen(PORT, () => console.log(`Back-end online on: ${PORT}`));
