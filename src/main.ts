import { Matrix4x4 } from 'matrixgl';
import Render from './util/Render';
import { IRenderObjectSetting, UNIFORM_TYPE } from './constants/interfaces';
import Torus from './util/Torus';

const vertexSource = `
attribute vec3 position;
attribute vec3 normal;
attribute vec4 color;
uniform   mat4 mvpMatrix;
uniform   mat4 invMatrix;
uniform   vec3 lightDirection;
varying   vec4 vColor;

void main(void){
    vec3  invLight = normalize(invMatrix * vec4(lightDirection, 0.0)).xyz;
    float diffuse  = clamp(dot(normal, invLight), 0.0, 1.0);
    vColor         = color * vec4(vec3(diffuse), 1.0);
    gl_Position    = mvpMatrix * vec4(position, 1.0);
}
`;
// const rgba = [0.0, 0.0, 0.0, 1.0]; // Red, Green, Blue, Alpha
const fragmentSource = `
precision mediump float;

varying vec4 vColor;

void main(void) {
  gl_FragColor = vColor;
}
`;

const circle = Torus(10, 10, 0.5, 3.0);
const setting: IRenderObjectSetting = {
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
  ibo: circle.index,
  uniLocations: [
    {
      name: 'mvpMatrix',
      type: UNIFORM_TYPE.FV4,
      location: new Matrix4x4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 5,
      ),
    },
    {
      name: 'invMatrix',
      type: UNIFORM_TYPE.FV4,
      location: new Matrix4x4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 5,
      ),
    },
    {
      name: 'lightDirection',
      type: UNIFORM_TYPE.FV3,
      location: [-0.5, 0.5, 0.5],
    },
  ],
};

Render(setting, vertexSource, fragmentSource);
