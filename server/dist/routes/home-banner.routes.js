"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_banner_1 = require("../controllers/home-banner");
const storage_1 = __importDefault(require("../libs/storage"));
const router = (0, express_1.Router)();
router.get('/', home_banner_1.getBanner);
router.post('/', storage_1.default.single('image'), home_banner_1.updateBanner);
exports.default = router;
//# sourceMappingURL=home-banner.routes.js.map