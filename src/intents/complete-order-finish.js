const order = require('../models/order');

function createHandler(connection) {
  let mOrder = order.model(connection);

  /**
   * 
   * @param {*} agent 
   * @param {Object} props 
   * @param {string} props.address
   * @param {string} props.name
   */
  async function finish(agent, props) {
    try {
      let orderContext = agent.getContext('order-created')
      let o = await mOrder.findById(orderContext.parameters.order);
      
      agent.add(`Deine bestellung für ${o.name} wird nach ${o.address} geliefert`);

    } catch(err) {
      agent.add(['Da ist etwas schief gelaufen.', err.message, err.stack]);
    }
  }

  function handler(agent) {
    return Promise.resolve(finish(agent, {
      address: agent.parameters['address'],
      name: agent.parameters['name']
    }));
  }

  return handler;
}

module.exports = createHandler;