var AnimationFramework = function (container) {
    var framework = this;
    // PRIVATES: //
    this.root = this;
    this.frames = [];
    this.current_frame = 0;
    this.container = container;

    // METHODS: //
    this.nextFrame = function () {
        var self = this;
        var next = function () {
            self.frames[self.current_frame].close();
            self.current_frame++;
            var nframe = self.frames[self.current_frame];
            if (self.current_frame < self.frames.length) {
                nframe.index = self.current_frame;
                nframe.start(self.container, self.current_frame);
            } else {
                console.log("Animation complete");
            }
        };

        var cframe = self.frames[self.current_frame];
        if (cframe.onFrameChange !== undefined) {
            cframe.onFrameChange(next);
        } else {
            next();
        }
    };
    this.start = function () {
        this.frames[this.current_frame].start(framework.container, framework.current_frame);
    };

    // CLASS DEFINITIONS: //
    this.Frame = function () {
        this.current_sprite = 0;
        this.sprites = [];
        this.container = '';

        this.start = function (container, frameIndex) {
            //boot up the animation sequence and get it started...
            this.container = "ani_frame" + frameIndex;
            $(container).append('<div style="position: relative; top: 0px; left: 0px;" id="' + this.container + '"></div>')

            this.sprites[0].index = this.current_sprite;
            this.sprites[0].init(this);
        };
        this.nextSprite = function () {
            this.current_sprite++;
            if (this.current_sprite < this.sprites.length) {
                this.sprites[this.current_sprite].index = this.current_sprite;
                this.sprites[this.current_sprite].init(this);
            }
        };
        this.close = function () {
            $('#' + this.container).remove();
        };
    };
    this.Sprite = function (options) {
        this.image_url = '';
        if (options.image_url !== undefined)
            this.image_url = options.image_url;

        this.x = 0;
        if (options.x !== undefined)
            this.x = options.x;

        this.y = 0;
        if (options.y !== undefined)
            this.y = options.y;

        this.trigger_sprites = [];
        this.clientid = '';

        this.init = function (parent) {
            this.draw(parent);
        };
        this.animate = function (parent) {
            //this will usually always be overwritten by manual implementation...
        };
        this.close = function (parent) {
            //this will usually always be overwritten by manual implementation...
        };
        this.draw = function (parent) {
            var self = this;
            self.clientid = '_sprite' + self.index;

            var img = $('<img />');
            img.hide();
            img.attr('id', self.clientid);
            img.css({ 'position': 'absolute', 'top': self.y, 'left': self.x });
            img.attr('src', self.image_url);
            $('#' + parent.container).append(img);

            self.animate(parent);
        };

        //replace the stock functions with user defined (if provided):
        if (options.init !== undefined)
            this.init = options.init;
        if (options.animate !== undefined)
            this.animate = options.animate;
        if (options.close !== undefined)
            this.close = options.close;
    };
};
