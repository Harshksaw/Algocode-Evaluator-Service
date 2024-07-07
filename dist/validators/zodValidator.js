"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(Object.assign({}, req.body));
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: 'Invalid request params received',
            data: {},
            error: error
        });
    }
};
exports.validate = validate;
