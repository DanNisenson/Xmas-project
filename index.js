let superheroes = require("./assets/superhero.json");
const express = require("express");
const idCheck = require("./middlewares/validation/idCheck.js")
const app = express();
const port = 3003;

app.use(express.json());
// app.use(express.urlencoded());


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
  
  // .patch((req, res) => {
  //   const id = idCheck(req.params.id);

  //   if (id) {
  //     console.log(req.body);
  //     const singleHero = superheroes.filter((hero) => hero.id === id);
  //     res.status(200).json(singleHero);
  //   } else {
  //     res.status(400).send("Invalid id");
  //   }
  // });

  // PUT single hero
  app.post('/', , (req, res) => {
    const body = req.body;

    res.status(200).json(body);
  });



app.listen(port, () => {
  console.log("listening on port 3003");
});
