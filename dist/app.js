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
// CORS configuration
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
// Health check route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'SmartPOS: Restaurant Management System Backend Server is running',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
    });
});
//app route
app.use('/', routes_1.mainRoutes);
// global error handler
app.use(globalErrorHandler_1.default);
// 404 Route
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
exports.default = app;
