"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controler_js_1 = require("../controllers/user.controler.js");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', user_controler_js_1.newUser);
userRouter.get('/', user_controler_js_1.allUsers);
userRouter.post('/login', user_controler_js_1.loginUser);
userRouter.put('/:id', user_controler_js_1.editUser);
userRouter.delete('/:id', user_controler_js_1.deleteUser);
exports.default = userRouter;
