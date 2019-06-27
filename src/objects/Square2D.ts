import { Matrix4, Float32Vector2 } from 'matrixgl';
import BaseObject from '../lib/GLCLass/BaseObject';


export default () => {
  const square2D = new BaseObject('square');
  const POSITION = 'position';

  square2D.addVBO(POSITION, {
    name: POSITION,
    data: [
      1, -1, 1,
      1, 1, 1,
      -1, 1, 1,
      -1, -1, 1,
    ],
    vboLocation: -1,
    size: 3,
  });

  square2D.setIBO([
    0, 1, 2,
    0, 2, 3,
  ]);

  const mvpMatrix = {
    name: 'mvpMatrix',
    uniLocation: Matrix4.identity().scale(0.1, 0.1, 0.1).translate(2, 2, 0),
    bind: null,
  };
  const mouse = {
    name: 'mouse',
    uniLocation: new Float32Vector2(0.5, 0.5),
    bind: null,
  };

  square2D.addUniLocation(mvpMatrix);
  square2D.addUniLocation(mouse);
  return square2D;
};
