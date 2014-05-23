**Welcome to the nodebot workshop**

We're going to learn the basics of the `johnny-five` api, as a series of code challenges.

`johnny-five` is an api for working with Arduino and other rapid prototyping boards, but

**You _don't_ need an Arduino for this workshop**

The workshop will pose a challenge, and test your solution.
The low level code to talk to the Ardunio is stubbed out.

**You _will_ be writing working, executable `johnny-five` code**

Each of your solutions can be run directly as a `node` program.
Wire up an Arduino, connect the USB and you can see your solution run for real.

-------------------------------------------------------------------------------

## Blink...Blink

Write a program that blinks an LED attached to pin 13 once every second.

Before you begin, you'll need to install the `johnny-five` library using `npm install johnny-five`.

Create a file and `require` the `johnny-five` module. You'll need to create a new `Board` instance and attach an event listener, listening for the **ready** event.

When the board is ready, you'll need to create a new `Led` instance, passing it the pin number it is attached to. Finally you should call the `strobe` method on your Led instance, passing it a time (in milliseconds) you want the strobe interval to be. 

