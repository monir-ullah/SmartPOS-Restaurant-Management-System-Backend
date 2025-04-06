"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes/routes");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const body_parser_1 = __importDefault(require("body-parser"));
// import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app = (0, express_1.default)();
// Express Parsers
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// // Handling cors issue
// app.use(
//   cors({
//     origin: 'https://fullstack-client-side.vercel.app',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
//   }),
// )
// Handling cors issue
app.use((0, cors_1.default)({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));
//app route
app.use('/', routes_1.mainRoutes);
app.get('/', (req, res) => {
    res.json('SmartPOS: Restaurant Management System Backend Server is running');
});
// global error handler
app.use(globalErrorHandler_1.default);
//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    res.json('Not found route');
});
exports.default = app;
