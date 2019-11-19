const base = 100;

const size = {
  'Groß': 9,
  'Mittel': 7,
  'Klein': 5,
  'Family': 2,
  'Party': 4
};

const kind = {
  'Salami': 200,
  'Hawaii': 300,
  'Hackfleisch': 250,
  'Käse': 50,
  'Schinken': 225,
  'Ananas': 150,
  'Margherita': 100
}

const extras = {
  'ohne käse': -50,
  'extra käse': 50,
  'extra scharf': 25,
  'Ohne Extras': 0
}

module.exports = {
  base,
  size,
  kind,
  extras
}