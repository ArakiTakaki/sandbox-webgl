import {
  Matrix4x4, Float32Vector4, Float32Vector3,
} from 'matrixgl';
import { UNIFORM_TYPE } from './constants/interfaces';

import Torus from './objectGenerators/Torus';
import BaseObject from './GLClasses/BaseObject';
import fragmentConstants from './shader/fragmentConstants';
import vertexConstants from './shader/vertexConstants';

const circleCreator = (name: string, row: number, col: number, irad: number, orad: number) => {
  const circle = Torus(row, col, irad, orad);

  const circleObject = new BaseObject(name);

  const { ATTRIBUTES } = vertexConstants;
  circleObject.addVBO({
    data: circle.position,
    name: ATTRIBUTES.POSITION,
    size: ATTRIBUTES.POSITION_SIZE,
  });

  circleObject.addVBO({
    data: circle.color,
    name: ATTRIBUTES.COLOR,
    size: ATTRIBUTES.COLOR_SIZE,
  });

  circleObject.addVBO({
    data: circle.normal,
    name: ATTRIBUTES.NORMAL,
    size: ATTRIBUTES.NORMAL_SIZE,
  });

  circleObject.setIBO(circle.index);

  const { UNIFORMS: V_UNIFORMS } = vertexConstants;
  const { UNIFORMS: F_UNIFORMS } = fragmentConstants;

  circleObject.addUniLocation({
    name: V_UNIFORMS.MVP_MATRIX,
    type: UNIFORM_TYPE.MAT4,
    location: new Matrix4x4(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 5,
    ),
  });

  circleObject.addUniLocation({
    name: V_UNIFORMS.M_MATRIX,
    type: UNIFORM_TYPE.MAT4,
    location: new Matrix4x4(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 3, 0, 5,
    ),
  });

  circleObject.addUniLocation({
    name: F_UNIFORMS.INV_MATRIX,
    type: UNIFORM_TYPE.MAT4,
    location: new Matrix4x4(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 5,
    ),
  });

  circleObject.addUniLocation({
    name: F_UNIFORMS.AMBIENT_COLOR,
    type: UNIFORM_TYPE.VEC4,
    location: new Float32Vector4(0.1, 0.1, 0.1, 1.0),
  });

  circleObject.addUniLocation({
    name: F_UNIFORMS.EYE_DIRECTION,
    type: UNIFORM_TYPE.VEC3,
    location: new Float32Vector3(0.0, 0.0, 20.0),
  });
  return circleObject;
};

export default circleCreator;
