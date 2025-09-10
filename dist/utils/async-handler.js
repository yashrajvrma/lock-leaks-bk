"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(next);
    };
};
exports.default = AsyncHandler;
//# sourceMappingURL=async-handler.js.map