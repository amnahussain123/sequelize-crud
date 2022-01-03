module.exports = app => {
    const testing = require("../controllers/testing.controller.js");
    var router = require("express").Router();
    // Create a new Testing
    router.post("/", testing.create);
    router.get("/", testing.findAll);
    app.use('/api/testings', router);
  };