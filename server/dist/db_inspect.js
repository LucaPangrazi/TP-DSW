"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./db/connection"));
const inspect = async () => {
    try {
        await connection_1.default.authenticate();
        console.log('DB Connected');
        const [results] = await connection_1.default.query('SELECT * FROM funtion');
        console.log('Funtion Data:', results);
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        process.exit();
    }
};
inspect();
//# sourceMappingURL=db_inspect.js.map