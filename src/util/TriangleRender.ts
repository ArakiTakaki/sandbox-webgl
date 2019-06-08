// /* eslint-disable import/no-unresolved */
// // eslint-disable-next-line import/no-duplicates
// import vertexSource from '../shader/fragment.glsl';
// // eslint-disable-next-line import/no-duplicates
// import fragmentSource from '../shader/fragment.glsl';

import CanvasManager from '../core/CanvasManager';
import { IGLAttributeSetting } from '../constants/interfaces';
import Matrix from './Matrix';

const vertexSource = `
attribute vec3 position;
attribute vec4 color;
uniform   mat4 mvpMatrix;
varying   vec4 vColor;

void main(void){
    vColor = color;
    gl_Position = mvpMatrix * vec4(position, 1.0);
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

export default () => {
  const GlClass = CanvasManager.createCanvas(600, 600, 'root');

  const vertex = GlClass.createShader(vertexSource, 'v1', 'vertex');
  const fragment = GlClass.createShader(fragmentSource, 'f1', 'fragment');
  const program = GlClass.createProgram(vertex, fragment);

  const attribSettingList: IGLAttributeSetting[] = [
    {
      name: 'color',
      data: [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
      ],
      size: 4,
    },
    {
      name: 'position',
      data: [
        0.0, 1.0, 0.0,
        1.0, -1.0, 0.0,
        -1.0, -1.0, 0.0,
      ],
      matrixList: [
        new Matrix().scale(-10, -10),
        new Matrix().scale(-20, -20),
        new Matrix().scale(-30, -30),
        new Matrix().scale(-40, -40),
        new Matrix().scale(-50, -50),
        new Matrix().scale(-60, -60),
        new Matrix().scale(-70, -70),
        new Matrix().scale(-80, -80),
      ],
      size: 3,
    },
  ];

  const uniLocation = GlClass.gl.getUniformLocation(program, 'mvpMatrix');
  attribSettingList.forEach(setting => {
    const index = GlClass.gl.getAttribLocation(program, setting.name);
    GlClass.setAttribute(setting, index);
  });

  attribSettingList.forEach(setting => {
    if (setting.matrixList == null) {
      return;
    }
    setting.matrixList.forEach(matrix => {
      GlClass.drawObject(uniLocation, matrix.create(), setting.data.length, setting.size);
    });
  });

  GlClass.flush();
};
