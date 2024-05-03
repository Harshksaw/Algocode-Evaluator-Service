"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@bull-board/api");
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
const express_1 = require("@bull-board/express");
const sampleQueue_1 = __importDefault(require("../queues/sampleQueue"));
const serverAdapter = new express_1.ExpressAdapter();
serverAdapter.setBasePath('/ui');
(0, api_1.createBullBoard)({
    queues: [new bullMQAdapter_1.BullMQAdapter(sampleQueue_1.default)],
    serverAdapter,
});
exports.default = serverAdapter;
