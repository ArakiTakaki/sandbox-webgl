import { Matrix4, Float32Vector2 } from 'matrixgl';
import BaseObject from '../lib/GLCLass/BaseObject';
import Torus from '../objectGenerators/Torus';

export default () => {
  const square = new BaseObject('square');
  const { position, index } = Torus(30, 30, 1.0, 2.0);
  const POSITION = 'position';

  square.addVBO(POSITION, {
    name: POSITION,
    data: position,
    vboLocation: -1,
    size: 3,
  });

  square.setIBO(index);

  const mvpMatrix = {
    name: 'mvpMatrix',
    uniLocation: Matrix4.identity().scale(0.1, 0.1, 0.1).translate(-2, -2, 0),
    bind: null,
  };
  const mouse = {
    name: 'mouse',
    uniLocation: new Float32Vector2(0.5, 0.5),
    bind: null,
  };

  const i = 0.1;
  setInterval(() => {
    mvpMatrix.uniLocation = mvpMatrix.uniLocation.rotateX(i);
  }, 50);

  square.addUniLocation(mvpMatrix);
  square.addUniLocation(mouse);
  return square;
};
