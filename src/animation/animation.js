export class Player {
    constructor(id, sprite, track, viewBox) {
        this.id = id;
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
        this.collisionRadius = 12;
        this.isDone = false;
        this.laps = 0;
        this.progress = 0;
        this.isCollision = false;
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

        this.calculatePosition(Math.PI);

        this.transformPosition();
    }

    move() {
        if (this.isCollision) {
            this.velocity = this.velocity - this.acceleration
        } else if (this.velocity < this.maxVelocity) {
            this.velocity = this.velocity + this.acceleration;
        }
        if (this.velocity < 0) this.velocity = 0;

        if (this.yOffset >= 5) {
            let newOffset = this.yOffset - this.velocity / 20;
            if (this.isCollision) {
                newOffset = this.yOffset + this.velocity / 5;
                // console.log(this.id, 'collision')
            }
            if (newOffset < 5) newOffset = 5;
            if (newOffset > 100) newOffset = 100;

            this.yOffset = newOffset;
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

            const objects = [...this.objects];
            objects.sort(function (a, b) { return a.progress - b.progress });
            for (let i = 0; i < objects.length - 1; i++) {
                const a = objects[i];
                let isCollision = false;
                // for (let b of objects) {
                //     if (b.id !== a.id) {
                const b = objects[i + 1];
                if (collision(a, b)) {
                    isCollision = true;
                    // console.log(a.id, 'collide', b.id);
                }
                //     }
                // }

                a.isCollision = isCollision;

                // if(isCollision) console.log(a.id,'collide with' ,b.id)
            }

            for (let object of this.objects) {
                object.move();
            }

            requestAnimationFrame(() => this.run());
        } else {
            this.onFinish();
        }

    }

    // detectCollision() {
    //     const objects = [...this.objects];
    //     objects.sort(function (a, b) { return a.progress - b.progress });

    //     for (let i = 0; i < objects.length - 1; i++) {
    //         const a = objects[i];
    //         const b = objects[i + i];

    //         a.isCollision = collision(a, b);
    //     }
    // }

    onFinish() {
        const objects = [...this.objects];
        objects.sort(function (a, b) { return a.progress - b.progress });

        console.log('done');
        console.log(objects);
    }
};

function collision(a, b) {
    const dx = a.position.x - b.position.x;
    const dy = a.position.y - b.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < a.collisionRadius + b.collisionRadius) {
        return true;
    }

    return false;
}