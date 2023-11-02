/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs: string[] = readline().split(' ');
const W: number = parseInt(inputs[0]); // width of the building.
const H: number = parseInt(inputs[1]); // height of the building.
const N: number = parseInt(readline()); // maximum number of turns before game over.
var inputs: string[] = readline().split(' ');
const X0: number = parseInt(inputs[0]);
const Y0: number = parseInt(inputs[1]);

let minX = 0
let maxX = 0
let minY = 0
let maxY = 0
let x = X0
let y = Y0
let deplacementsY: number[] = []
let deplacementsX: number[] = []
let setuped = false


// game loop
while (true) {
    const bombDir: string = readline(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)

    const isMoveUp = ["U", "UR", "UL"].includes(bombDir)
    const isMoveDown = ["D", "DR", "DL"].includes(bombDir)
    const isMoveLeft = ["L", "UL", "DL"].includes(bombDir)
    const isMoveRight = ["R", "UR", "DR"].includes(bombDir)
    const isMoveVertical = isMoveUp || isMoveDown
    const isMoveHorizontal = isMoveLeft || isMoveRight

    // setup first min, max
    if (!setuped) {
        if (isMoveUp) {
            minY = 0
            maxY = Y0
        } else if (isMoveDown) {
            minY = Y0
            maxY = H - 1
        }
        if (isMoveLeft) {
            minX = 0
            maxX = X0
        } else if (isMoveRight) {
            minX = X0
            maxX = W - 1
        }
    } else {
        if (isMoveUp) {
            const deplMinY = deplMin(deplacementsY, y)
            minY = deplMinY < y ? deplMinY : 0
            maxY = y - 1
        } else if (isMoveDown) {
            const deplMaxY = deplMax(deplacementsY, y)
            minY = y
            maxY = deplMaxY > y ? deplMaxY : H - 1
        }
        if (isMoveLeft) {
            const deplMinX = deplMin(deplacementsX, x)
            minX = deplMinX < x ? deplMinX : 0
            maxX = x - 1 
        } else if (isMoveRight) {
            const deplMaxX = deplMax(deplacementsX, x)
            minX = x
            maxX = deplMaxX > x ? deplMaxX : W - 1
        }
    }
    setuped = true

    if (isMoveVertical) {
        if (maxY === minY) {
            y = maxY
        } else {
            y = Math.ceil((maxY - minY) / 2) + minY
        }
    }
    
    if (isMoveHorizontal) {
        if (maxX === minX) {
            x = maxX
        } else {
            x = Math.ceil((maxX - minX) / 2) + minX
        }
    }

    // the location of the next window Batman should jump to.
    const location = `${x} ${y}`
    deplacementsX.push(x)
    deplacementsY.push(y)
    console.log(location);
}

function deplMax(depl: number[], min: number) {
    return [...depl].reverse().find(el => el > min)
}

function deplMin(depl: number[], min: number) {
    return [...depl].reverse().find(el => el < min)
}
