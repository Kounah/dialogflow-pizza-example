#!/usr/bin/env node
'use stict';

let intents = require('./')({
  mongodburl: 'mongodb://localhost:27017/pizza-example'
});

console.log(intents);