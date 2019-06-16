import { Matrix4x4 } from 'matrixgl';
import Render from './util/Render';
import { IRenderObjectSetting, UNIFORM_TYPE } from './constants/interfaces';
import Torus from './util/Torus';

const vertexSource = `
attribute vec3 position;
attribute vec3 normal;
attribute vec4 color;
uniform   mat4 mvpMatrix;
varying   vec3 vNormal;
varying   vec4 vColor;

void main(void){
    vNormal     = normal;
    vColor      = color;
    gl_Position = mvpMatrix * vec4(position, 1.0);
}
`;
// const rgba = [0.0, 0.0, 0.0, 1.0]; // Red, Green, Blue, Alpha
const fragmentSource = `
precision mediump float;

uniform mat4 invMatrix;
uniform vec3 lightDirection;
uniform vec3 eyeDirection;
uniform vec4 ambientColor;
varying vec3 vNormal;
varying vec4 vColor;

void main(void){
    vec3  invLight  = normalize(invMatrix * vec4(lightDirection, 0.0)).xyz;
    vec3  invEye    = normalize(invMatrix * vec4(eyeDirection, 0.0)).xyz;
    vec3  halfLE    = normalize(invLight + invEye);
    float diffuse   = clamp(dot(vNormal, invLight), 0.0, 1.0);
    float specular  = pow(clamp(dot(vNormal, halfLE), 0.0, 1.0), 10.0);
    vec4  destColor = vColor * vec4(vec3(diffuse), 1.0) + vec4(vec3(specular), 1.0) + ambientColor;
    gl_FragColor    = destColor;
}
`;

const circle = Torus(30, 30, 0.5, 1.0);
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
      name: 'lightDirection',
      type: UNIFORM_TYPE.VEC3,
      location: [-0.5, 0.5, 0.5],
    },
    {
      name: 'ambientColor',
      type: UNIFORM_TYPE.VEC4,
      location: [0.1, 0.1, 0.1, 1.0],
    },
    {
      name: 'eyeDirection',
      type: UNIFORM_TYPE.VEC3,
      location: [0.0, 0.0, 20.0],
    },
  ],
};

Render(setting, vertexSource, fragmentSource);
