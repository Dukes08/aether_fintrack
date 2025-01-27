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
require("tsconfig-paths/register");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./app/routers/index"));
const database_1 = __importDefault(require("./app/configs/database"));
dotenv_1.default.config();
const App = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3001', 10);
App.use(express_1.default.json());
App.use((0, cors_1.default)());
App.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send('It works!');
    }
    catch (error) {
        console.error('Error al realizar operaciones en la base de datos:', error);
        res.status(500).send('Internal Server Error, check logs');
    }
}));
(0, index_1.default)(App);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.default)();
        App.listen(port, () => {
            console.log(`Mi port ${port}`);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error starting the server:', error.message);
        }
        else {
            console.error('Unknown error:', error);
        }
        process.exit(1);
    }
});
startServer();
//# sourceMappingURL=index.js.map