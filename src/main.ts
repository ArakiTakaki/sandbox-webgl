import {
  Matrix4x4, Float32Vector4, Float32Vector3,
} from 'matrixgl';
import fragmentSource from './shader/fragment.glsl';
import vertexSource from './shader/vertex.glsl';
import Render from './util/Render';
import { IRenderObjectSetting, UNIFORM_TYPE } from './constants/interfaces';
import Torus from './objectGenerators/Torus';


const circle = Torus(20, 20, 0.4, 0.8);
const setting: IRenderObjectSetting[] = [
  {
    vbo: [
      {
        name: 'position',
        data: circle.position,
        size: 3,
      },
      {
        name: 'normal',
        data: circle.normal,
        size: 3,
      },
      {
        name: 'color',
        data: circle.color,
        size: 4,
      },
    ],
    ibo: {
      name: 'obj1',
      data: circle.index,
    },
    uniLocations: [
      {
        name: 'mvpMatrix',
        type: UNIFORM_TYPE.MAT4,
        location: new Matrix4x4(
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 5,
        ),
      },
      {
        name: 'invMatrix',
        type: UNIFORM_TYPE.MAT4,
        location: new Matrix4x4(
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 5,
        ),
      },
      {
        name: 'ambientColor',
        type: UNIFORM_TYPE.VEC4,
        location: new Float32Vector4(0.1, 0.1, 0.1, 1.0),
      },
      {
        name: 'eyeDirection',
        type: UNIFORM_TYPE.VEC3,
        location: new Float32Vector3(0.0, 0.0, 20.0),
      },
      {
        name: 'mMatrix',
        type: UNIFORM_TYPE.MAT4,
        location: new Matrix4x4(
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 5,
        ),
      },
    ],
  }, {
    vbo: [
      {
        name: 'position',
        data: circle.position,
        size: 3,
      },
      {
        name: 'normal',
        data: circle.normal,
        size: 3,
      },
      {
        name: 'color',
        data: circle.color,
        size: 4,
      },
    ],
    ibo: {
      name: 'obj1',
      data: circle.index,
    },
    uniLocations: [
      {
        name: 'mvpMatrix',
        type: UNIFORM_TYPE.MAT4,
        location: new Matrix4x4(
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 1, 0, 3,
        ),
      },
      {
        name: 'invMatrix',
        type: UNIFORM_TYPE.MAT4,
        location: new Matrix4x4(
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 5,
        ),
      },
      {
        name: 'ambientColor',
        type: UNIFORM_TYPE.VEC4,
        location: new Float32Vector4(0.1, 0.1, 0.1, 1.0),
      },
      {
        name: 'eyeDirection',
        type: UNIFORM_TYPE.VEC3,
        location: new Float32Vector3(0.0, 0.0, 10.0),
      },
      {
        name: 'mMatrix',
        type: UNIFORM_TYPE.MAT4,
        location: new Matrix4x4(
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 10,
        ),
      },
    ],
  },
];


Render(setting, vertexSource, fragmentSource);
