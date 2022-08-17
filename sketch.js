// @ts-check
window.angle = 0  
window.slider = null
window.root = null
window.tree = createArray()
window.inp = null

window.closeSpan = document.getElementById("close")
window.aboutWindow = document.getElementById("about-window")
window.openAbout = document.getElementById("open-about")

function setup() {
    createCanvas(600, 600)
    initEvtListener()

    inp = createInput("35")
    let deg = inp?.value()

    angle = toRadians(deg)

    let a = new Vector(width / 2, height)
    let b = new Vector(width / 2, height - 200)

    root = new Branch(a, b)
    tree.push(root)
}

function draw() {
    background(50)

    inp?.input(setAngle)

    printTree(tree)
}

function keyTyped() {
    if (keyCode === 32) {
        for (let i = tree.length - 1; i >= 0; i--) {
            tree.push(tree[i].branch("right"))
            tree.push(tree[i].branch("left"))
            tree[i].finished = true
        }
    }
}

function setAngle() {
    let angleDeg = Number.parseInt(inp?.value(), 10)
    
    angle = toRadians(angleDeg)
}