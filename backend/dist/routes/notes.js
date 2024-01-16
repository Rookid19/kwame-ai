"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notes_1 = require("../controllers/notes");
const validate_1 = require("../middlewares/validate");
const router = (0, express_1.Router)();
router.get('/all', notes_1.getNotes);
router.post('/add', validate_1.validateAddNotes, notes_1.addNotes);
exports.default = router;
