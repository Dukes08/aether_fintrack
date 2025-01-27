"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_router_1 = __importDefault(require("./contact.router"));
const operation_router_1 = __importDefault(require("./operation.router"));
const registerRoutes = (app) => {
    app.use('/v1', contact_router_1.default);
    app.use('/v1', operation_router_1.default);
};
exports.default = registerRoutes;
//# sourceMappingURL=index.js.map