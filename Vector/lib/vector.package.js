// Made by Michael A. Polesensky
// 2022
// This is a custom fork of p5.Vector!


// PI
window._ONE_PI = 3.14159265358979323846

// static namespace
window.Geometry = new function Geometry() {
    this.create2DVector = function create2DVector(x, y) {
        if (typeof x === "undefined" && typeof y === "undefined") {
            return new Vector()
        }

        return new Vector(x, y)
    }

    this.create3DVector = function create3DVector(x, y, z) {
        if (typeof x === "undefined" && typeof y === "undefined" && typeof z === "undefined") {
            return new Vector3D()
        }

        return new Vector3D(x, y, z)
    }

    this.add = /** @param {Vector} vectorA @param {Vector} vectorB */ function add(vectorA, vectorB) {
        let x = vectorA.x + vectorB.x
        let y = vectorA.y + vectorB.y

        return new Vector(x, y)
    }

    this.sub = /** @param {Vector} vectorA @param {Vector} vectorB */ function sub(vectorA, vectorB) {
        let x = vectorA.x - vectorB.x
        let y = vectorA.y - vectorB.y

        return new Vector(x, y)
    }

    this.dotProduct = /** @param {Vector} vectorA @param {Vector} vectorB */ function dotProduct(vectorA, vectorB) {
        let dot = (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y)

        return dot
    }

    this.crossProduct = /** @param {Vector} vectorA @param {Vector} vectorB */ function crossProduct(vectorA, vectorB) {
        // Magnitude of vector A
        let magA = Math.sqrt(Math.pow(vectorA.x, 2) + Math.pow(vectorA.y, 2))
        // Magnitude of vector B
        let magB = Math.sqrt(Math.pow(vectorB.x, 2) + Math.pow(vectorB.y, 2))

        // Angle between x-axis and vector A
        let angleA = Math.atan(vectorA.y / vectorA.x)
        // Angle between x-axis and vector B
        let angleB = Math.atan(vectorB.y / vectorB.x)

        // Angle diff
        let angle = Math.abs(angleA - angleB)

        let product = magA * magB * Math.sin(angle)

        return product
    }

    this.getAngleDeg = /** @param {Vector} vector */ function getAngle(vector) {
        let angle = fromRadians(Math.atan2(vector.y, vector.x))
        
        return angle
    }

    this.div = /** @param {Vector} vectorA @param {Vector} vectorB */ function div(vectorA, vectorB) {
        if (vectorB.x > 0 && vectorB.y > 0) {
            let x = vectorA.x / vectorB.x
            let y = vectorA.y / vectorB.y

            return new Vector(x, y)
        } else {
            console.warn("Potencial division by zero!")

            return undefined
        }
    }

    return this
}

// classes impl
window.Vector = /** @param {Number} x @param {Number} y */ function Vector(x, y) {
    /** @type {Number} */
    this.x = x || 0
    /** @type {Number} */
    this.y = y || 0

    this.add = /** @param {Vector} other */ function add(other) {
        this.x += other.x
        this.y += other.y

        return this
    }

    this.sub = /** @param {Vector} other */ function sub(other) {
        this.x -= other.x
        this.y -= other.y 

        return this
    }

    this.div = /** @param {Vector} other */ function div(other) {
        this.x /= other.x
        this.y /= other.y

        return this
    }

    this.mulByScalar = /** @param {Vector} other */ function mulByScalar(scalar) {
        this.x *= scalar
        this.y *= scalar
    }

    this.mulByVector = /** @param {Vector} other */ function mulByVector(other) {
        this.x *= other.x
        this.y *= other.y

        return this
    }

    this.getMagnitudeSq = /** @return {Number} */ function getMagnitudeSq() {
        // Returns the magnitude r (direction/heading) of the current vector!
        let r = this.x * this.x + this.y * this.y

        return r
    }

    this.getMagnitude = /** @return {Number} */ function getMagnitude() {
        // Returns the square root of r.
        return Math.sqrt(this.getMagnitudeSq())
    }

    this.heading = /** @param {AngleOptions} options @return {Number} */ function heading(options) {
        // Returns the angle of current vector from the X-Axis in DEG.
        const h = Math.atan2(this.y, this.x)
        
        // !!RETURNS RADIANS!!
        if (options.angleUnits === "deg") {
            return fromRadians(h)
        } else if (options.angleUnits === "rad") {
            return h
        } else if (typeof options === "undefined") {
            return h
        }
    }

    this.rotateRad = /** @param {Number} rad @return {void} */ function rotateDeg(rad) {
        // Rotates vector by radiants rad.
        if (typeof rad !== "undefined") {
            const newHeading = this.heading({angleUnits: "rad"}) + rad
            const currentMag = this.getMagnitude()

            this.x = Math.cos(newHeading) * currentMag
            this.y = Math.sin(newHeading) * currentMag
        } else {
            console.warn("Illegeal operation!")
            return this
        }
    }

    this.rotateDeg = /** @param {Number} deg @return {void} */ function rotateDeg(deg) {
        // Rotates vector by deg.
        if (typeof deg !== "undefined") {
            const newHeading = this.heading({angleUnits: "deg"}) + deg
            const currentMag = this.getMagnitude()

            this.x = Math.cos(toRadians(newHeading)) * currentMag
            this.y = Math.sin(toRadians(newHeading)) * currentMag

            return this
        } else {
            console.warn("Illegal operation!")
            return this
        }
    }

    this.setAngleRad = /** @param {Number} rad @return {void} */ function setAngleRad(rad) {
        // Sets magnitude + dir of vector from provided radians.
        let m = this.getMagnitude()

        this.x = Math.cos(rad) * m
        this.y = Math.sin(rad) * m

        return this
    }

    this.setAngleDeg = /** @param {Number} deg @return {void} */ function setAngleDeg(deg) {
        // Sets magnitude + dir of vector from provided degrees.
        let m = this.getMagnitude()

        this.x = Math.cos(toRadians(deg)) * m
        this.y = Math.sin(toRadians(deg)) * m

        return this
    }

    this.toString = function toString() {
        return `Vector2D object: [${this.x} ${this.y}]`
    }

    this.copy = function copy() {
        return new Vector(this.x, this.y)
    }

    return this
}

window.Vector3D = /** @param {Number} x @param {Number} y @param {Number} z */ function Vector3D(x, y, z) {
    /** @type {number} */
    this.x = x || 0
    /** @type {number} */
    this.y = y || 0
    /** @type {number} */
    this.z = z || 0

    this.add = /** @param {Vector3D} other */ function add(other) {
        this.x += other.x
        this.y += other.y
        this.z += other.z
    }

    this.sub = /** @param {Vector3D} other */ function sub(other) {
        this.x -= other.x
        this.y -= other.y
        this.z -= other.z
    }

    this.div = /** @param {Vector3D} other */ function div(other) {
        this.x /= other.x
        this.y /= other.y
        this.z /= other.z
    }

    this.mulByScalar = /** @param {Number} scalar */ function mulByScalar(scalar) {
        this.x *= scalar
        this.y *= scalar
        this.z *= scalar
    }

    this.mulByVector = /** @param {Vector3D} other */ function mulByVector(other) {
        this.x *= other.x
        this.y *= other.y
        this.z *= other.z
    }

    this.getMagnitudeSq = function getMagnitudeSq() {
        const magSq = this.x * this.x + this.y * this.y + this.z * this.z

        return magSq
    }

    this.getMagnitude = function getMagnitude() {
        const mag = Math.sqrt(this.getMagnitudeSq())

        return mag
    }

    this.getXYMagnitudeSq = function getXYMagnitudeSq() {
        const magSq = Math.pow(this.x, 2) + Math.pow(this.y, 2)
        
        return magSq
    }

    this.getXYMagnitude = function getXYMagnitude() {
        const l = Math.sqrt(this.getXYMagnitudeSq())

        return l
    }

    this.heading = /** @param {AngleOptions} options @return {Vector3DDirection} */ function heading(options) {
        if (options.angleUnits === "deg") { 
            const mag = this.getXYMagnitude()

            const alpha = fromRadians(Math.acos(this.x / mag))
            const beta = fromRadians(Math.asin(this.x / mag))

            const tmp = fromRadians(Math.atan(this.z / mag))
            const gamma = 90 - tmp

            return {alpha: alpha, beta: beta, gamma: gamma}
        }
    }

    return this
}

window.Color = /** @param {Number} r @param {Number} g @param {Number} b */ function Color(r, g, b) {
    /** @type {number} */
    this.r = r
    /** @type {number} */
    this.g = g
    /** @type {number} */
    this.b = b

    return this
}

// function impl
window.fromRadians = function fromRadians(rad) {
    const deg = rad * (180 / _ONE_PI)

    return deg
}

window.toRadians = function toRadians(deg) {
    const rad = (deg * _ONE_PI) / 180

    return rad
}

// !!This function requires p5js to work!!
window.draw2DVector = /** @param {Vector} vectorA @param {Vector} vectorB @param {Color | String | Number} color */ function draw2DVector(vectorA, vectorB, color) {
    if (color instanceof Color) {
        stroke(color.r, color.g, color.b)
        fill(color.r, color.g, color.b)
    } else {
        stroke(color)
        fill(color)
    }

    line(vectorA.x, vectorA.y, vectorB.x, vectorB.y)
}

// 3D vector draw function WIP

// other const
window.UnitVectorX = new Vector(1, 0)
window.UnitVectorY = new Vector(0, 1)