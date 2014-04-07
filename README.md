Johnny Five is ALIVE!
=====================

**Warning** This workshop is just the idea of a work in progress. It will not currently teach you anything.

A nodeschool workshop on how to get your ardunio alive with rwaldron/johnny-five

The workshopper framework just went through a big refactor so I'm using the new 1.0 release of rvagg/learnyounode as the basis.
https://github.com/rvagg/learnyounode

**Note** The simple path for building a workshopper is to compare the stdout of a users solution file with the stdout of an accpted answer.
A useful johnny-five workshopper would allow the user to write a valid johnn-five program, with no requirement to set a mock ioboard implementation, so they could test their code in the workshopper and then run the same program, **unmodified**, against an ardunio.  

## TODO
- How to wrap the solution code and force the board object it creates to use a mock `ioboard` implementation.
See: https://github.com/rvagg/workshopper-wrappedexec