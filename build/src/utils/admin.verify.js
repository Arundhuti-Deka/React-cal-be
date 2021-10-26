"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../config"));
const admin_model_1 = __importDefault(require("../models/admin/admin.model"));
const adminSecret = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqToken = req.headers && req.headers.authorization || '';
        const token = reqToken.split(' ');
        if (token && token.length === 2) {
            const matchToken = token[1];
            const verified = jsonwebtoken_1.verify(matchToken, config_1.default.ADMIN_JWT_SECRET);
            if (verified) {
                if (token) {
                    const decoded = jsonwebtoken_1.decode(matchToken);
                    if (decoded) {
                        try {
                            const adminDetails = yield admin_model_1.default.findById(decoded._id);
                            if (adminDetails) {
                                req['tokenId'] = decoded._id;
                                next();
                            }
                            else {
                                res.status(401).json({ adminDetails: true });
                            }
                        }
                        catch (err) {
                            res.status(500).json({ decoded: true });
                        }
                    }
                }
                else {
                    console.log(Error);
                }
            }
            else {
                console.log(Error);
            }
        }
        else {
            res.status(403).json({ token: "Required" });
        }
    }
    catch (err) {
        res.status(403).json({ token: true, err });
    }
});
exports.default = adminSecret;
//# sourceMappingURL=admin.verify.js.map