"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const user_1 = require("../models/users/user");
const router = express_1.Router();
router.get("/", (_, res) => {
    res.send("<h3>Welcome to Node.js server!!!</h3>");
});
router.get("/user", (_, res) => {
    res.send("<p>user data logged</p>");
    user_1.fetchAllUsers()
        .then(res => {
        const [rows, field] = res;
        console.log(rows);
    })
        .catch(err => console.log(err));
});
const registrationData = (req, res) => {
    const user = req.body.user;
    user_1.saveUser(user)
        .then(() => res.redirect("/user"))
        .catch((err) => console.log(err));
};
router.post("/api/registration", registrationData);
exports.routes = router;
