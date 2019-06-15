// /* eslint-disable import/no-unresolved */
// // eslint-disable-next-line import/no-duplicates
// import vertexSource from '../shader/fragment.glsl';
// // eslint-disable-next-line import/no-duplicates
// import fragmentSource from '../shader/fragment.glsl';

import CanvasManager from '../core/CanvasManager';
import { IGLAttributeSetting } from '../constants/interfaces';
import { SHADER_TYPE, BUFFER_TYPE } from '../core/WebGLClass';

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

const GlClass = CanvasManager.createCanvas(600, 600, 'root');
const vertex = GlClass.createShader(vertexSource, 'v1', SHADER_TYPE.VERTEX);
const fragment = GlClass.createShader(fragmentSource, 'f1', SHADER_TYPE.FRAGMENT);
const program = GlClass.createProgram(vertex, fragment);

const uniLocation = GlClass.gl.getUniformLocation(program, 'mvpMatrix');


export default (attribSettingList: IGLAttributeSetting[]) => {
  GlClass.init();
  attribSettingList.forEach(setting => {
    const index = GlClass.gl.getAttribLocation(program, setting.name);
    GlClass.setAttribute(setting, index, BUFFER_TYPE.VBO);
  });

  attribSettingList.forEach(setting => {
    if (setting.matrixList == null) {
      return;
    }
    setting.matrixList.forEach(matrix => {
      GlClass.drawObject(
        uniLocation,
        matrix.create(),
        setting.data.length,
        setting.size, BUFFER_TYPE.VBO,
      );
    });
  });

  GlClass.flush();
};
