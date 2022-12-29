// check if fields to update are valid
const fieldCheck = (body, hero) => {

  for (key in body) {

    if (Object.keys(hero).includes(key)) {

      hero = {
        ...hero,
        [key]: body[key],
      };
    
    } else {
      return false;
    }
  }

  return hero;
};

module.exports = fieldCheck;
