Write a program that blinks an LED attached to pin 13 once every second.

Before you begin, you'll need to install the `johnny-five` library using `npm install johnny-five`.

Create a file and `require` the `johnny-five` module. You'll need to create a new `Board` instance and attach an event listener, listening for the **ready** event.

When the board is ready, you'll need to create a new `Led` instance, passing it the pin number it is attached to. Finally you should call the `strobe` method on your Led instance, passing it a time (in milliseconds) you want the strobe interval to be. 
