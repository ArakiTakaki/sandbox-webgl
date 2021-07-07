/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
import BaseObject from './GLCLass/BaseObject';
import BaseGLClass from './GLCLass/BaseGLClass';
import { BUFFER_TYPE, IIBOSetting } from '../constants/interfaces';
import Errors from '../util/Errors';


const Industrial = (
  baseObjectList: BaseObject[],
  vertex: string,
  fragment: string,
  canvasID: string,
) => {
  const GLClass = new BaseGLClass(600, 600, canvasID);
  GLClass.createProgram(vertex, fragment);

  for (const baseObject of baseObjectList) {
  /**
   * VBOフェーズ
   */
    const vboMap = baseObject.getVBOMap();
    for (const vbo of vboMap) {
      const positionLocation = GLClass.getAttribLocation(vbo[1].name);
      vbo[1].vboLocation = positionLocation;
      vbo[1].buffer = GLClass.createBuffer(vbo[1].data, BUFFER_TYPE.VBO);
    }

    /**
   * IBOフェーズ
   */
    const ibo = baseObject.getIBO();
    if (ibo == null) return;
    const iboBuffer = GLClass.createBuffer(ibo.data, BUFFER_TYPE.IBO);
    ibo.buffer = iboBuffer;

    /**
   * UNIFORMフェーズ
   */
    const uniLocationMap = baseObject.getUniLocationMap();
    for (const uniLocation of uniLocationMap) {
      const location = GLClass.getUniLocation(uniLocation[1].name);
      if (location == null) throw Errors.nullPointer('initial uniform location of null');
      uniLocation[1].bind = location;
    }
  }
  const render = () => {
    GLClass.preRenderObject();
    for (const baseObject of baseObjectList) {
      const vboMap = baseObject.getVBOMap();
      const ibo = baseObject.getIBO() as IIBOSetting;
      const uniLocationMap = baseObject.getUniLocationMap();
      GLClass.renderObject(vboMap, uniLocationMap, ibo);
    }
    GLClass.flush();
    // eslint-disable-next-line no-undef
    window.requestAnimationFrame(render);
  };
  render();
};

export default Industrial;
