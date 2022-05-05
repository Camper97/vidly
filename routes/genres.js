const Joi = require("joi");
const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: "Romance" },
    { id: 2, name: "Horror" },
    { id: 3, name: "Action" },
    { id: 4, name: "Drama" },
  ];
  
  router.get("/", (req, res) => {
    if (genres.length >= 0) {
      res.send(genres);
    } else {
      res.send("List is empty");
    }
  });
  
  router.post("/", (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = {
      id: genres.length + 1,
      name: req.body.name,
    };
    genres.push(genre);
    res.send(`${genre.name} added on id ${genre.id}.`);
  });
  
  router.put("/:id", (req, res) => {
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("genre not found");
  
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let oldGenre = genre.name;
    genre.name = req.body.name;
    res.send(`${oldGenre} changed to ${genre.name}.`);
  });
  
  router.delete("/:id", (req, res) => {
    if (req.body.name === "delete all") {
      genres.splice(0, genres.length);
      res.send(`all genres deleted`);
    }
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("genre not found");
  
    let oldGenre = genre.name;
    genres.splice(genres.indexOf(genre), 1);
    res.send(`${oldGenre} deleted.`);
  });
  
  router.get("/:id", (req, res) => {
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("genre not found");
    
    res.send(genre);
  });

  
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}
  module.exports = router;