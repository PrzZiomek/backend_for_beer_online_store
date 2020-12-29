"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartContent = exports.getCartContent = void 0;
const database_1 = require("../../util/database");
const token_1 = require("../../models/token/token");
const errorHandle_1 = require("../errors/errorHandle");
const getCartContent = async () => {
    const resDB = await database_1.pool.execute('SELECT * FROM shoppingCart');
    return resDB[0];
};
exports.getCartContent = getCartContent;
const cartContent = async (req, res, next) => {
    const shoppingCart = JSON.stringify(req.body);
    database_1.pool.execute('INSERT INTO shoppingCart (shoppingCart) VALUES (?)', [shoppingCart]);
    // PROVISIONAL SOLUTION:
    const rows = await exports.getCartContent().catch(err => next(errorHandle_1.errorHandle(err, 500)));
    if (!rows)
        return;
    const cartContFromDB = JSON.parse(JSON.stringify(rows));
    if (!cartContFromDB.length) {
        return res.status(422).json({
            message: 'koszyk pusty'
        });
    }
    else {
        res.status(200).json({
            message: "zawartość koszyka zapisana",
            cartContent: cartContFromDB,
            token: token_1.token,
        });
    }
};
exports.cartContent = cartContent;
