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
      let created = await model.create(props);
      agent.setContext({
        name: 'pizza-configured',
        lifespan: 2,
        parameters: {
          pizza: Object.entries(created)
            .filter(e => typeof e[1] !== 'function')
            .reduce((p, c) => {
              p[c[0]] = c[1];
              return p;
            }, {})
        }
      })
    } catch(err) {
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
      kind = agent.parameters['pizza-kind'],
      size = agent.parameters['pizza-size'],
      extras = agent.parameters['pizza-extras']
    }))
  }

  return handler;
}

module.exports = createHandler;