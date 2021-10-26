"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class HealthCheckRouter {
    constructor() {
        this.router = express_1.Router();
        this.initializeRouter();
    }
    initializeRouter() {
        this.router.get('/healthcheck', (req, res) => {
            res.status(200).json({ health: 'ecommerce api up on running' });
        });
    }
}
exports.default = HealthCheckRouter;
//# sourceMappingURL=healthcheck.route.js.map