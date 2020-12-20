import { getRandom, getTime } from './../utils';
var requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;

var sBrowser, sUsrAg = navigator.userAgent;

if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "FF";
    // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
}

const fps = 60;

const history = [];
export class Player {
    constructor(id, sprite, track, viewBox) {
        this.id = id;
        this.name = "";
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
        this.collisionRadius = 11;
        this.isDone = false;
        this.isFinish = false;
        this.laps = 0;
        this.progress = 0;
        this.isCollision = false;
        this.time = 0;
        this.callback = () => { };
        this.startTime = null;
    }

    prepare(name, offset, maxVelocity, acceleration, callback) {
        this.name = name;
        this.maxVelocity = maxVelocity;
        this.acceleration = acceleration;
        this.callback = callback;

        const startPos = this.track.getPointAtLength(0);

        this.trackPoint = {
            x: startPos.x,
            y: startPos.y,
        };

        this.lastTrackPoint = { ...this.trackPoint };

        this.yOffset = offset.y;
        this.xOffset = offset.x;

        if (sBrowser == 'FF') {
            const helmet = this.sprite.querySelector('.helmet');
            const back = this.sprite.querySelector('.back');

            back.style.transformBox = 'initial';
            this.helmet = {
                x: helmet.getAttribute('cx'),
                y: helmet.getAttribute('cy'),
            }
        }

        this.calculatePosition(Math.PI);

        this.transformPosition();
    }

    move() {
        if (!this.startTime) this.startTime = new Date();

        const minOffset = 2.5,
            maxOffset = 120;

        if (this.isCollision) {
            this.velocity = this.velocity - this.acceleration
        } else if (this.velocity < this.maxVelocity) {
            this.velocity = this.velocity + this.acceleration;
        }

        if (this.velocity < 0) this.velocity = this.acceleration;

        if (this.yOffset >= minOffset) {
            let newOffset = this.yOffset - this.velocity / 15;

            if (this.isCollision) {
                newOffset = this.yOffset + this.velocity / 5;

                if (newOffset > maxOffset) newOffset = this.yOffset - this.velocity / 5;
            }
            else if (this.rotation > -1 || this.rotation < -179) {
                const divider = getRandom(35, 55);
                newOffset = this.yOffset + this.velocity / divider;
            }

            if (newOffset < minOffset) newOffset = minOffset;
            if (newOffset > maxOffset) newOffset = maxOffset;

            this.yOffset = newOffset;
        }

        this.progress = this.progress + this.velocity;
        const trackLength = this.track.getTotalLength();

        if (this.progress > trackLength) {
            this.progress = 0;
            this.laps = this.laps - 1;
        }

        if (!this.isFinish && this.laps === 0) {
            this.isFinish = true;
            const endTime = new Date();
            this.time = endTime - this.startTime
            this.callback(this);
        }

        if (this.laps === 0 && this.progress > 75) {
            this.isDone = true;
            this.velocity = 0;

            this.transformPosition();
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


        const back = this.sprite.querySelector('.back');
        let backRotation = 0;
        const rotation = Math.abs(this.rotation + 180);

        if (rotation > 1 && rotation < 179) {
            if (rotation > 20) backRotation = 20;
            else if (rotation < -20) backRotation = -20;
            else backRotation = rotation;
        }

        if (sBrowser == 'FF') {
           
            back.style.transformBox = 'initial';

            back.style.transformOrigin = `${this.helmet.x}px ${this.helmet.y}px`;
        }

        back.style.transform = `rotate(${-backRotation}deg)`;

        const dust = this.sprite.querySelectorAll('.dust');
        dust.forEach(el => {
            el.style.opacity = this.velocity > 0 ? (getRandom(0, 3) / 10) : 0;
        })
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

        setTimeout(() => {
            requestAnimationFrame(() => this.run());
            // this.run();
        }, 1000 / fps);
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


            setTimeout(() => {
                requestAnimationFrame(() => this.run());
            }, 1000 / fps);
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
        // console.log(objects);
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