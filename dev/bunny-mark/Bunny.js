/** Represents a single bunny. */
class Bunny extends Tiny.Sprite {
    constructor(texture, bounds) {
        super(texture);

        /** The amount of gravity */
        this.gravity = 0.75;

        /** Horizontal speed */
        this.speedX = Math.random() * 10;

        /** Vertical speed */
        this.speedY = Math.random() * 10 - 5;

        /** Reference to the bounds object */
        this.bounds = bounds;

        // Set the anchor position
        this.anchor.x = 0.5;
        this.anchor.y = 1;
    }

    /** Update the position of the bunny */
    update() {
        this.position.x += this.speedX;
        this.position.y += this.speedY;
        this.speedY += this.gravity;

        if (this.position.x > this.bounds.right) {
            this.speedX *= -1;
            this.position.x = this.bounds.right;
        } else if (this.position.x < this.bounds.left) {
            this.speedX *= -1;
            this.position.x = this.bounds.left;
        }

        if (this.position.y > this.bounds.bottom) {
            this.speedY *= -0.85;
            this.position.y = this.bounds.bottom;
            if (Math.random() > 0.5) {
                this.speedY -= Math.random() * 6;
            }
        } else if (this.position.y < this.bounds.top) {
            this.speedY = 0;
            this.position.y = this.bounds.top;
        }
    }

    /** Don't use after this. */
    destroy(options) {
        this.bounds = null;
        super.destroy(options);
    }
}

export default Bunny;
