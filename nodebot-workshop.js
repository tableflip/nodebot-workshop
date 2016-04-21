#!/usr/bin/env node

const workshop = require('workshopper-adventure')({
    appDir    : __dirname
  , languages : ['en', 'ja']
  , menu      : {fg: 'black', bg: /^win/.test(process.platform) ? 'yellow' : 220}
  , header    : require('workshopper-adventure/default/header')
  , footer    : require('workshopper-adventure/default/footer')
})

workshop.addAll(require('./exercises/menu.json'))

workshop.execute(process.argv.slice(2))
