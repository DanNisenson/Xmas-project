// check if super-hero is in data-base
const idCheck = (paramsId, superheroes) => {

  let id = parseInt(paramsId);

  if (superheroes.findIndex(hero => hero.id === id) === -1) {
    return false;
  } else {
    return id;
  }
};

module.exports = idCheck;