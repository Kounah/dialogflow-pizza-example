const order = require('../models/order');
const pizza = require('../models/pizza');

/**
 * 
 * @param {import('mongoose').Connection} connection 
 */
function createHandler(connection) {
  let mOrder = order.model(connection);
  let mPizza = pizza.model(connection);

  /**
   * handles webhook
   * @param {*} agent 
   */
  function handler(agent) {
    return Promise.resolve((async () => {
      let configured = agetn.getContext('pizza-configured');

      if(typeof configured === 'object' && configured !== null) {

        let pizzas = [];
        let _pizzas;
        if(typeof _pizzas.parameters === 'object' && _pizzas.parameters !== null) {
          if(Array.isArray(_pizzas.parameters.pizzas)) {
            _pizzas = await Promise.all(_pizzas.parameters.pizzas
              .map(pid => Promise.resolve((async pid => {
                return await mPizza.findById(pid);
              })(pid))));
            if(Array.isArray(_pizzas)) {
              pizzas = pizzas.concat(..._pizzas);
              delete _pizzas;
            }
          }
        }

        let order = await mOrder.create({
          pizzas,
          price: pizzas.reduce((p, c) => p += pizza.price(c))
        })

        agent.setContext({
          name: 'order-created',
          lifespan: 5,
          parameters: {
            order: order._id
          }
        })

        agent.add([
          'Deine Bestellung sieht wiefolgt aus',
          ...pizzas.map(p => `Pizza ${p.kind}, ${p.size} ${p.extras} (${pizza.price(p)/100}€)`),
          `Das wären dann insgesamt ${order.price/100}€`,
          'Willst du die Bestellung so abschliessen?'
        ]);
      } else {
        agent.add(['Es scheint als hast du noch garkeine Pizza erstellt']);
      }
    })());
  }

  return handler;
}

module.exports = createHandler;