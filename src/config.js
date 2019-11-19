/**
 * @typedef {Config} Config
 */

class Config {
  /**
   * 
   * @param {Config} props 
   */
  constructor(props) {

    this.mongodburl = props.mongodburl;

  }
}

module.exports = Config;