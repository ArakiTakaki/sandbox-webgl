import {
  Matrix4, Vector3, Vector4,
} from 'matrixgl';
import BaseObject from '../lib/GLCLass/BaseObject';
import Sphere from '../objectGenerators/Sphere';

export default () => {
  const square = new BaseObject('square');
  const {
    position, index, color, normal,
  } = Sphere(40, 40, 2);
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
    uniLocation: Matrix4.identity().scale(0.1, 0.1, 0.1).translate(2, 2, 0).rotateX(10),
    bind: null,
  };

  const invMatrix = {
    name: 'invMatrix',
    uniLocation: Matrix4.identity().scale(0.1, 0.1, 0.1).translate(-2, -2, 0),
    bind: null,
  };

  const lightDirection = {
    name: 'lightDirection',
    uniLocation: new Vector3(0.1, 0.1, 0.1),
    bind: null,
  };

  const eyeDirection = {
    name: 'eyeDirection',
    uniLocation: new Vector3(0.1, 0.1, 0.1),
    bind: null,
  };

  const ambientColor = {
    name: 'ambientColor',
    uniLocation: new Vector4(0.1, 0.1, 0.1, 0.1),
    bind: null,
  };

  const i = 0.1;
  setInterval(() => {
    mvpMatrix.uniLocation = mvpMatrix.uniLocation
      .rotateX(i)
      .rotateY(i);
    invMatrix.uniLocation = invMatrix.uniLocation
      .rotateX(-i)
      .rotateY(-i);
  }, 50);

  square.addUniLocation(mvpMatrix);
  square.addUniLocation(invMatrix);
  square.addUniLocation(lightDirection);
  square.addUniLocation(eyeDirection);
  square.addUniLocation(ambientColor);
  return square;
};
