/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
import { Float32Vector2, Matrix4 } from 'matrixgl';
import vertex from './shader/vertex.glsl';
import fragment from './shader/fragment.glsl';
import BaseObject from './lib/GLCLass/BaseObject';
import Industrial from './lib/Industrial';

const square = new BaseObject('square');
const POSITION = 'position';
// const MVP_MATRIX = 'mvpMatrix';
square.addVBO(POSITION, {
  name: POSITION,
  data: [
    1, 1, 0,
    -1, 1, 0,
    1, -1, 0,
    -1, -1, 0,
  ],
  vboLocation: -1,
  size: 3,
});

square.setIBO([
  0, 1, 2,
  1, 3, 2,
]);

const mvpMatrix = {
  name: 'mvpMatrix',
  uniLocation: Matrix4.identity().scale(0.9, 0.9, 1),
  bind: null,
};
const mouse = {
  name: 'mouse',
  uniLocation: new Float32Vector2(0.5, 0.5),
  bind: null,
};
square.addUniLocation(mvpMatrix);
square.addUniLocation(mouse);

const CanvasID = 'sample';
Industrial(square, vertex, fragment, CanvasID);
