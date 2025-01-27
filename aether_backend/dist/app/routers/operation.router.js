"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const operations_controller_1 = require("../controllers/operations.controller");
router.get('/operations', operations_controller_1.getAllOperationsController);
router.post('/operation', operations_controller_1.createOperationController);
router.get('/operations/contact/:contactId', operations_controller_1.getOperationsController);
exports.default = router;
//# sourceMappingURL=operation.router.js.map