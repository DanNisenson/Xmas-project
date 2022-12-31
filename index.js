const express = require("express");
const { check, body } = require("express-validator");
var cors = require('cors');
let superheroes = require("./assets/superhero.json");
const idCheck = require("./middlewares/validation/idCheck");
const fieldCheck = require("./middlewares/validation/fieldCheck");
const {
  isDuplicate,
  addHeroCheck,
  addHeroValidation,
  editHeroCheck,
} = require("./middlewares/validation/addHeroValidation");

// set-up
const app = express();
const port = 3003;
app.use(express.json());
app.use(cors());

// METHODS

// all superheroes
app.get("/", (req, res) => {
  res.status(200).json(superheroes);
});

// single hero
app
  .route("/:id")
  .get((req, res) => {
    const id = idCheck(req.params.id, superheroes);

    if (id) {
      const singleHero = superheroes.filter((hero) => hero.id === id);
      res.status(200).json(singleHero);
    } else {
      res.status(400).send("Invalid id");
    }
  })
  .delete((req, res) => {
    const id = idCheck(req.params.id, superheroes);

    if (id) {
      let singleHero = {};
      let newArray = [];
      superheroes.forEach((hero) => {
        if (hero.id !== id) {
          newArray = [...newArray, hero];
        } else {
          singleHero = hero;
        }
      });
      superheroes = newArray;
      res.status(200).json(singleHero);
    } else {
      res.status(400).send("Invalid id");
    }
  })
  .patch((req, res) => {
    const id = idCheck(req.params.id, superheroes);

    if (id) {
      const body = req.body;
      let singleHero = superheroes.filter((hero) => hero.id === id);
      singleHero = fieldCheck(body, singleHero[0]);

      if (singleHero) {
        res.status(200).json(singleHero);
      } else {
        res.status(400).send("Invalid field");
      }
    } else {
      res.status(400).send("Invalid id");
    }
  });

// POST single hero
app.post("/", addHeroCheck, addHeroValidation, (req, res) => {
  const body = req.body;

  // Check if already stored.
  //  There has to be a way to do this proper.
  if (isDuplicate(body.name, superheroes) !== -1)
    return res.status(400).json({ errors: "Super hero already included" });

  const newId = superheroes[superheroes.length - 1].id + 1;

  superheroes = [
    ...superheroes,
    {
      id: newId,
      ...body,
    },
  ];

  res.status(200).json(superheroes);
});

app.listen(port, () => {
  console.log("listening on port 3003");
});
