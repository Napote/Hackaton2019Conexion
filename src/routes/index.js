const { Router } = require("express");
const router = Router();


router.get("/", (req, res) => {
    res.render("index");
});

router.post("/new-contact", (req,res) => {
    console.log(req.body);
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }
    res.redirect("/");
});

router.get("/delete-contact/:id", (req,res) => {
    res.redirect("/");
});

module.exports = router;