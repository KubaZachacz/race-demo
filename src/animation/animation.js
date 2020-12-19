export class Player {
    constructor(sprite, track, viewBox) {
        this.sprite = sprite;
        this.track = track;
        this.lastTrackPoint = {
            x: null,
            y: null
        };
        this.trackPoint = {
            x: null,
            y: null
        };
        this.position = {
            x: null,
            y: null
        };
        this.rotation = 0;
        this.viewBox = viewBox;
        this.yOffset = 0;
        this.xOffset = 0;
        this.velocity = 0;
        this.maxVelocity = 3;
        this.acceleration = 0.05;
        this.collisionRadius = 0;
        this.isDone = false;
        this.laps = 0;
        this.progress = 0;
    }

    prepare(offset, maxVelocity, acceleration) {
        this.maxVelocity = maxVelocity;
        this.acceleration = acceleration;

        const startPos = this.track.getPointAtLength(0);

        this.trackPoint = {
            x: startPos.x,
            y: startPos.y,
        };

        this.lastTrackPoint = { ...this.trackPoint };

        this.yOffset = offset.y;
        this.xOffset = offset.x;

        // const ox = this.yOffset * Math.sin(startRad) + this.xOffset * Math.cos(startRad),
        //     oy = this.yOffset * Math.cos(startRad) - this.xOffset * Math.sin(startRad)

        // this.position = {
        //     x: this.trackPoint.x - ox,
        //     y: this.trackPoint.y + oy,
        // };

        // this.rotation = -(180 - startRad * (180 / Math.PI));

        this.calculatePosition(Math.PI);

        this.transformPosition();
    }

    move() {
        if (this.velocity < this.maxVelocity) {
            this.velocity = this.velocity + this.acceleration;
        }

        this.progress = this.progress + this.velocity;
        const trackLength = this.track.getTotalLength();

        if (this.progress > trackLength) {
            this.progress = 0;
            this.laps = this.laps - 1;
        }

        if (this.laps === 0) {
            this.isDone = true;
        }

        if (!this.isDone) {
            const trackPoint = this.track.getPointAtLength(this.progress);

            this.trackPoint = {
                x: trackPoint.x,
                y: trackPoint.y,
            };

            this.calculatePosition();

            this.lastTrackPoint = { ...this.trackPoint }

            this.transformPosition();
        }
    }

    calculatePosition(startRad) {
        const dx = this.trackPoint.x - this.lastTrackPoint.x;
        const dy = this.trackPoint.y - this.lastTrackPoint.y;

        const rad = startRad || Math.atan2(dy, dx);
        const ox = this.yOffset * Math.sin(Math.PI - rad) + this.xOffset * Math.cos(rad),
            oy = - this.yOffset * Math.cos(Math.PI - rad) - this.xOffset * Math.sin(rad);

        this.rotation = -(180 - rad * (180 / Math.PI));

        // this.position = {
        //     x: this.trackPoint.x,
        //     y: this.trackPoint.y,
        // };
        this.position = {
            x: this.trackPoint.x - ox,
            y: this.trackPoint.y + oy,
        };
    }

    transformPosition() {
        const init_x = this.viewBox.width / 2,
            init_y = (this.viewBox.height / 2),
            pos_x = this.position.x - init_x,
            pos_y = this.position.y - init_y;

        // this.sprite.style.transform = `translate(${pos_x}px, ${pos_y}px)`
        this.sprite.style.transform = `translate(${pos_x}px, ${pos_y}px) rotate(${this.rotation}deg)`
    }
}

export class Animation {
    constructor(objects) {
        this.objects = objects;
    }

    start(laps) {
        for (let object of this.objects) {
            object.laps = laps;
            object.progress = 0;
            object.isDone = false;
        }

        requestAnimationFrame(() => this.run());
    }

    stop() {

    }

    run() {
        const isDone = !this.objects.map(object => object.isDone).includes(false);

        if (!isDone) {
            requestAnimationFrame(() => this.run());
            for (let object of this.objects) {
                object.move();
            }
        } else {
            this.onFinish();
        }

    }

    onFinish() {
        console.log('done');
    }
};