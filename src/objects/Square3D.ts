import { Matrix4 } from 'matrixgl';
import BaseObject from '../lib/GLCLass/BaseObject';
import Circle2D from '../objectGenerators/Circle2D';

export default () => {
  const square = new BaseObject('square');
  const {
    position, index, color, normal,
  } = Circle2D(4, [2, 2, 10, 1]);
  const POSITION = 'position';
  const COLOR = 'color';
  const NORMAL = 'normal';

  square.addVBO(POSITION, {
    name: POSITION,
    data: position,
    vboLocation: -1,
    size: 3,
  });
  square.addVBO(NORMAL, {
    name: NORMAL,
    data: normal,
    vboLocation: -1,
    size: 3,
  });
  square.addVBO(COLOR, {
    name: COLOR,
    data: color,
    vboLocation: -1,
    size: 4,
  });

  square.setIBO(index);

  const mvpMatrix = {
    name: 'mvpMatrix',
    uniLocation: Matrix4
      .identity()
      .scale(0.4, 0.4, 0.1)
      .translate(1, 1, 0),
    bind: null,
  };

  const i = 0.1;
  setInterval(() => {
    mvpMatrix.uniLocation = mvpMatrix.uniLocation
      .rotateX(i * 2)
      .rotateY(i)
      .rotateZ(i / 2);
  }, 50);

  square.addUniLocation(mvpMatrix);
  // square.addUniLocation(invMatrix);
  // square.addUniLocation(lightPosition);
  // square.addUniLocation(eyeDirection);
  // square.addUniLocation(ambientColor);
  // square.addUniLocation(mMatrix);
  return square;
};
