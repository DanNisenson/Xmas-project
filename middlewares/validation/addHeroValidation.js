const { check, body, validationResult } = require('express-validator');

exports.isDuplicate = (heroName, superheroes) => {

  return superheroes.findIndex(hero => hero.name === heroName);
}

exports.addHeroCheck = [
  body(["name", "publisher", "alter_ego", "characters"] )
  .exists()
  .trim()
  .isAlphanumeric('es-ES', {ignore: ' '})
  .withMessage("Name, publisher, alter ego and/or characters can only contain letters, numbers and white spaces.")
  .isLength({ min: 3 })
  .withMessage("Name, publisher, alter ego and/or characters is too short")
  .isLength({ max: 20 })
  .withMessage("Name, publisher, alter ego and/or characters is too long"),
  
  body("first_appearance")
  .exists()
  .trim()
  .isLength({ min: 5 })
  .withMessage("First appearance is too short")
  .isLength({ max: 40 })
  .withMessage("First appearance is too long"),
  
  body("image")
  .exists()
  .trim()
  .isURL()
  .withMessage("Must provide valid URL")

]

exports.editHeroCheck = this.addHeroCheck.map(field => field.optional());

exports.addHeroValidation = (req, res, next) => {
  const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
}
