// @ts-ignore
// class impl
window.Branch = /** @param {Vector} start @param {Vector} end */ function Branch(start, end) {
    /** @type {Vector} */
    this.begin = start
    /** @type {Vector} */
    this.end = end
    /** @type {boolean} */
    this.finished = false
    /** @type {number} */
    this.weight = 1

    this.drawBranch = /** @param {String | Number} color @param {Number} weight */ function drawBranch(color) {
        stroke(color)
        strokeWeight(this.weight)
        line(this.begin.x, this.begin.y, this.end.x, this.end.y)

        return this
    }

    Branch.prototype.branch = /** @param {String} orientation */ function branch(orientation) {
        this.weight *= 1.10
        
        if (orientation === "right") {
            this.finished = true

            let dir = Geometry.sub(this.end, this.begin)
            dir.rotateRad(angle)
            dir.mulByScalar(0.64)

            let newEnd = Geometry.add(this.end, dir)

            let right = new Branch(this.end, newEnd)
            
            return right

        } else if (orientation === "left") {
            this.finished = true

            let dir = Geometry.sub(this.end, this.begin)
            dir.rotateRad(-angle)
            dir.mulByScalar(0.64)

            let newEnd = Geometry.add(this.end, dir)

            let left = new Branch(this.end, newEnd)

            return left
        }
    }

    return this
}

window.createArray = function createArray(length) {
    if (typeof length === "undefined") {
        return []
    }

    return new Array(length)
}

window.printTree = function printTree(branchArray) {
    for (let i = 0; i < branchArray.length; i++) {
        branchArray[i].drawBranch(255)
    }
}

window.initEvtListener = function initEvtListener() {
    closeSpan.addEventListener("click", function () {
        aboutWindow.style.display = "none"
    })

    openAbout.addEventListener("click", function () {
        aboutWindow.style.display = "block"
    })
}