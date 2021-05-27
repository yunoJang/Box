const BOX_SIZE = 100;

let boxes = [];
let target = null;

class Box{
    constructor(){
        this.dom = document.createElement('div');
        this.dom.className = 'box';
        this.dom.style.background = getRandomColor();
        this.dom.onclick = this.target.bind(this);

        this.x = 0;
        this.y = 0;
    }

    move(){
        this.dom.style.transform = `translate(${this.x}px,${this.y}px)`;
    }

    target(){
        if(target) target.dom.classList.remove('target');

        target = this;
        target.dom.classList.add('target');
    }
}

function moveBox(direction) {
    if (!target) return;

    const offset = 45;

    const dy = [-1,0,1,0];
    const dx = [0,-1,0,1];

    let ny = target.y + (dy[direction] * offset);
    let nx = target.x + (dx[direction] * offset);

    if (ny<0 || ny+BOX_SIZE>window.innerHeight || nx<0 || nx+BOX_SIZE>window.innerWidth) return;

    target.y = ny;
    target.x = nx;

    target.move();
}

function createBox() {
    const box = new Box();
    boxes.push(box);

    document.body.append(box.dom)
}

function getRandomColor() {
    function getHex256() {
        return  Math.floor(Math.random()*255+1).toString(16)
    }

    let red = getHex256();
    red = red.length<2 ? '0'+red : red;
    let green = getHex256();
    green = green.length<2 ? '0'+green : green;
    let blue = getHex256();
    blue = blue.length<2 ? '0'+blue : blue;

    const color = `#${red}${green}${blue}`;
    return color;
}