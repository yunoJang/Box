const BOX_SIZE = 100;

let id = 0;

let boxes = [];
let target = null;

class Box{
    constructor(id){
        this.id = id;

        this.dom = document.createElement('div');
        this.dom.className = 'box';
        this.dom.style.background = getRandomColor();
        this.dom.onclick = this.target.bind(this);

        this.x = 0;
        this.y = 0;
    }

    render(){
        this.dom.style.transform = `translate(${this.x}px,${this.y}px)`;
    }

    move(direction){
        const offset = 45;

        const dy = [-1,0,1,0];
        const dx = [0,-1,0,1];
    
        let ny = this.y + (dy[direction] * offset);
        let nx = this.x + (dx[direction] * offset);
        
        if (ny<0 || ny+BOX_SIZE>window.innerHeight || nx<0 || nx+BOX_SIZE>window.innerWidth) return;
    
        this.y = ny;
        this.x = nx;
    
        this.render();
    }

    target(){
        clearTarget(); 

        target = this;
        target.dom.classList.add('target');
    }

    delete(){
        this.dom.remove();
        
        boxes = boxes.filter(box=> box.id!=this.id);
        clearTarget();
    }
}

function createBox() {
    const box = new Box(id++);
    boxes.push(box);

    document.body.append(box.dom)
}

function clearTarget() {
    if(target) target.dom.classList.remove('target');
    
    target = null;
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