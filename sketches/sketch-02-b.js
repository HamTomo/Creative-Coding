const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

// const animate = () => {
//   console.log('foo');
//   requestAnimationFrame(animate);
// };
// animate();


const sketch = ({context, width, height}) => {
  const rays = [];
  const rings = [];

  //circle centre
  const cx = width * 0.5;
  const cy = height * 0.5;

  const radius = width * 0.3;

  //Rectangle defaults
  const w = width * 0.01;
  const h = height * 0.1;

  //Number of units
  const num = 40;

  const slice = math.degToRad(360 / num);

  let x, y;

  for (let i = 0; i <num; i++){

    const angle = slice * i;

    x = cx + radius * Math.sin(angle);
    y = cy + radius * Math.cos(angle);

    rays.push(new Ray(x, y, angle, radius, w, h));
    rings.push(new Ring(cx, cy, angle, radius, slice));
  }

  return ({ context, width, height }) => {
    //set up background
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    //set up foreground
    context.fillStyle = 'black';

  rays.forEach(ray => {
    ray.update();
    ray.draw(context);
  })

  rings.forEach(ring => {
    ring.update();
    ring.draw(context);
  })
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Ring {
   constructor (x, y, angle, radius, slice) {
    const colours = ['red', 'blue', 'green', 'yellow'];
    this.colour = colours[parseInt(random.range(0, 4))];
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.radius = radius;
    this.slice = slice;
    this.radius = radius * random.range(0.7, 1.2);
    this.start = slice * random.range(1, -8);
    this.end = slice * random.range(1, 5);
    this.thick = random.range(5, 20);

    this.vel = math.degToRad(random.range (-1/2, 1/2));

  }
   
  draw (context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(-1 * this.angle);

    context.lineWidth = this.thick;

    context.beginPath();
    context.arc(0, 0, this.radius, this.start, this.end);
    context.strokeStyle = this.colour;
    context.stroke();

    context.restore();
   }
  update () {
    this.angle += this.vel;
   }
}

class Ray {
  constructor (x, y, angle, radius, w, h) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.radius = radius;
    this.w = w;
    this.h = h;
    this.scaleX = random.range(0.1, 2)
    this.scaleY = random.range(0.2, 0.5)
    this.cx = random.range(0, -0.5 * this.h);

    this.vel = 0;
  }

  draw (context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(-1 * this.angle);
    context.scale(this.scaleX, this.scaleY);

    context.beginPath();
    context.rect(-0.5 * this.w, this.cx, this.w, this.h);
    context.fill();
    context.restore();
  }

  update () {
  }
}
