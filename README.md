I edited it!!

AnimationFramework
==================

A simple, yet flexible, animation framework to create scripted animations.

View demo: http://www.kroltech.com/upload/misc/animationframework/demo/demo.html

Include: animationframework.js
Depencendies: jQuery (1.7+)
Optional: include jqeasing.js (included in demo) http://gsgd.co.uk/sandbox/jquery/easing/

To use:
=======

var demoAnimation = new AnimationFramework('.animationHome');

Create a new AnimationFramework - the only parameter being a selector to a container that the animation will run in.

var frame1 = new demoAnimation.Frame();

Create an empty frame to start with.  At the most basic level, an animation must consist of at least a single frame, that contains at least a single sprite.
<pre>
frame1.sprites.push(new demoAnimation.Sprite({
    image_url: "path/to/image/of/sprite.png",
    x: 0, //start X coordinate
    y: 0, //start Y coordinate
    
    //function to perform actual animation - do whatever you want here:
    animate: function (parent) {
        var self = this;
  
        //$('#' + self.clientid) refers to the container that holds each individual sprite
        $('#' + self.clientid).show().animate({
            'left': 500,
        }, 2000, 'linear', function () {
            //be sure to call parent.nextSprite() whenever you want the next sprite in line to start animating.
            //in this instance its once this sprite is finished.  We could have easily included it at the very 
            //beginning of this animation function so that the next sprite starts immediately (if you want simultaneous
            //animations for example)
            parent.nextSprite();
        });
    }
}));
</pre>
After declaring a frame, you push Sprites into it.  You can push as many new sprites as you want.  Just know that the order of the sprites that you push will dictate the order that they animate (each time parent.nextSprite() is called).  This can be manipulated a bit by experimenting with the timing of your animation functions.

Sprites contain a few settings:

image_url (path to the image for the sprite)
x (start X coordinate relative to the original container defined in the animation framework)
y (start Y coordinate relative to the original container defined in the animation framework)
animate (function that does the actual animation - as open and flexible as you need to do whatever you want)

Note: parent.nextSprite() isn't necessary in every animation call.  Its only necessary to keep the animation going through the frame.  You could create a single sprite that has an animation function that is on an infinite repeat.  (so you would have called parent.nextSprite() at the very beginning of your animation call so that the next sprite in line would have just continued the animation.

At some point, after you have added however many sprites you want, you will want to trigger the next frame of animation.  To do so:
<pre>
demoAnimation.nextFrame(); //instead of parent.nextSprite();
</pre>
The default behavior of frame changes in the animation framework is nothing - the currently frame simply blanks out and the next frame starts.  If you want to control what happens on each frame change:
<pre>
frame1.onFrameChange = function (callback) {
    $('#' + frame1.container).animate({
        'left': $(window).width() * -1
    }, 3000, 'easeInOutQuint', callback);
};
</pre>
Here we provide a custom onFrameChange function, which (in this example) causes the entire frame container to animate to the negative left of the screen (effectively swiping the whole frame off screen).




