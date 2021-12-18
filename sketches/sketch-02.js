const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const degToRad = (degrees) =>
{
  return degrees / 180 * Math.PI;
}


const randomRange = (min, max) =>
{
  return Math.random() * (max - min) + min;
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    //Cirle centre, and rad
    const cx = width * 0.5;
    const cy = height * 0.5;
    const radius = width * 0.3;

    //Rectangle height
    const w = width * 0.01;
    const h = height * 0.1;

    let x, y;

    //Number of units
    const num = 40;

    for (let i = 0; i <num; i++)
    {
      //
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      //Arc start location
      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      //repositon for drawing rectangles
      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      //change rectangle size
      context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

      //draw ray
      context.beginPath();
      context.rect(-w/2, random.range(0, -h/2), w, h);
      context.fill();
      context.restore();

      //repositon for drawing rings
      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      //change ring thickness
      context.lineWidth = random.range(5, 20);

      //draw ring
      context.beginPath();
      context.arc(0, 0, radius * random.range(0.7, 1.2) , slice * random.range(1, -8), slice * random.range(1, 5));
      context.stroke();

      context.restore();
    }



    // context.translate(100, 400);

    // context.beginPath();
    // context.arc(0, 0, 50, 0, Math.PI * 2);
    // context.fill();

  };
};

canvasSketch(sketch, settings);
