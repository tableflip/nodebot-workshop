#!/usr/bin/env node

const workshopper = require('workshopper')
    , path        = require('path')
    , menu        = require('./exercises/menu')

    , name        = 'johnny-five-is-alive'
    , title       = 'johnny-five is ALIVE!'
    , subtitle    = '\x1b[23mSelect an exercise and hit \x1b[3mEnter\x1b[23m to begin'


function fpath (f) {
  return path.join(__dirname, f)
}


workshopper({
    name        : name
  , title       : title
  , subtitle    : subtitle
  , exerciseDir : fpath('./exercises/')
  , appDir      : __dirname
  , helpFile    : fpath('help.txt')
  , menuItems   : []
})