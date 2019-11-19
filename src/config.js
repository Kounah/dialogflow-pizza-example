/**
 * @typedef {Config} Config
 */

class Config {
  /**
   * 
   * @param {Config} props 
   */
  constructor(props) {

    this.mongodbuurl = props.mongodburl;

  }
}

module.exports = Config;