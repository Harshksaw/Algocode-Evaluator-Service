"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingCheck = void 0;
const pingCheck = (_, res) => {
    return res.status(200).json({
        message: "Ping check ok"
    });
};
exports.pingCheck = pingCheck;
