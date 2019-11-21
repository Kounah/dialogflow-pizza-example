const pizza = require('../models/pizza');

/**
 * creates handler
 * @param {import('mongoose').Connection} connection 
 */
function createHandler(connection) {
  let model = pizza.model(connection);

  /**
   * creates pizza
   * @param {*} agent
   * @param {Object} props 
   * @param {string} props.kind
   * @param {string} props.size
   * @param {string} props.extras
   */
  async function createPizza(agent, props) {
    try {
      console.log('trying to create pizza');

      let created = await model.create(props);

      console.log('created pizza', pizza);

      let configured = agent.getContext('pizza-configured');

      console.log('got contenxt:', configured);

      let pizzas = [];
      if(typeof configured === 'object' && configured !== null) {
        if(typeof configured.parameters === 'object' && configured.parameters !== null) {
          if(Array.isArray(configured.parameters.pizzas))
            pizzas = configured.parameters.pizzas;
        }
      }

      pizzas.push(String(created._id));

      agent.setContext({
        name: 'pizza-configured',
        lifespan: 5,
        parameters: {
          pizzas: pizzas
        }
      });

      agent.add(`Ich habe eine Pizza ${created.kind}, ${created.size} für ${pizza.price(created)/100}€ zu deiner Bestellung hinzugefügt.`);
    } catch(err) {
      console.error(err);
      agent.add([
        'Deine Pizza konnte nicht erstellt werden.',
        err.toString()
      ]);
    }
  }

  /**
   * handels webhook
   * @param {*} agent 
   */
  function handler(agent) {  
    return Promise.resolve(createPizza(agent, {
      kind: agent.parameters['pizza-kind'],
      size: agent.parameters['pizza-size'],
      extras: agent.parameters['pizza-extras']
    }))
  }

  return handler;
}

module.exports = createHandler;