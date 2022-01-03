const db = require("../models");
const Testing = db.testing;
const Op = db.Sequelize.Op;
// Create and Save a new testing
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a Testing
      const testing = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
      };
    
      // Save Testing in the database
      Testing.create(testing)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Testing."
          });
        });
};

// Retrieve all testing from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Testing.findAll({ where: condition })
    .then(data => {
        res.render('index',{'data':data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single testing with an id
exports.findOne = (req, res) => {
  
};

// Update a testing by the id in the request
exports.update = (req, res) => {
  
};

// Delete a testing with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all testing from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published testing
exports.findAllPublished = (req, res) => {
  
};
