const superheroes = require("./assets/superhero.json");
const express = require("express");
const app = express();
const port = 3003;

app.use(express.json());
// app.use(express.urlencoded());

// METHODS

app.get("/", (req, res) => {
  res.status(200).json(superheroes);
});

app.get("/:id", (req, res) => {
  let id = parseInt(req.params.id);

  if ( !id || id < 1 || id > 20 ) {
    console.log('first')
    res.status(400).send('Invalid id').end();

  } else {
    id = parseInt(id);
    const singleHero = superheroes.filter(hero => hero.id === id);
    res.status(200).json(singleHero);
  }
});


// app.delete("/", (req, res) => {
//   res.status(200).json(superheroes);
// });

// POST

// PATCH

app.listen(port, () => {
  console.log("listening on port 3003");
});
