"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("../controllers/contact.controller");
const router = (0, express_1.Router)();
router.get('/contacts', contact_controller_1.getAllContactsController);
router.post('/contact', contact_controller_1.createContactController);
router.put('/contact/:id', contact_controller_1.updateContactController);
exports.default = router;
//# sourceMappingURL=contact.router.js.map