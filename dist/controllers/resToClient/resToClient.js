"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAlreadyExistResponse = void 0;
exports.userAlreadyExistResponse = (req, res) => {
    res.status(200).json({
        message: "Istnieje juz konto z takimi danymi",
    });
};
