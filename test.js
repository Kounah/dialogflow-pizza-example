#!/usr/bin/env node
'use stict';

let intents = require('./')({
  mongodburl: 'mongodb://127.0.0.1:27017/pizza-example'
});

console.log(intents);