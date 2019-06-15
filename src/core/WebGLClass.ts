/* eslint-disable no-undef */
/* eslint-disable no-bitwise */
import Errors from '../util/Errors';
import { IRenderObjectSetting } from '../constants/interfaces';

export enum BUFFER_TYPE {
  VBO = 'vbo',
  IBO = 'ibo',
}

export enum SHADER_TYPE {
  VERTEX = 'vertex',
  FRAGMENT = 'fragment',
}

interface ICacheShader {
  id: string;
  shader: WebGLShader;
}

interface ICacheBuffer {
  id: string;
  buffer: WebGLBuffer;
}

interface IAttribLocation {
  id: string;
  location: number;
}

export default class WebGLClass {
  element: HTMLCanvasElement;

  /* WebGLのメインコンポーネント */
  gl: WebGLRenderingContext;

  /* 幅 */
  glWidth: number;

  /* 高さ */
  glHeight: number;

  program?: WebGLProgram;

  uniLocation: WebGLUniformLocation | null = null;

  shaderList: ICacheShader[] = [];

  bufferList: ICacheBuffer[] = [];

  attrLocationList: IAttribLocation[] = [];

  /**
   * webglをコントロールするクラス
   * @param width - width
   * @param height - height
   * @param id - canvas id
   */
  public constructor(width: number, height: number, id: string) {
    const canvas = document.createElement('canvas');
    this.glWidth = width;
    this.glHeight = height;
    canvas.setAttribute('width', String(width));
    canvas.setAttribute('height', String(height));
    canvas.setAttribute('id', id);
    document.body.appendChild(canvas);
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('canvas error');
    }
    this.element = canvas;
    const webgl = this.element.getContext('webgl') || this.element.getContext('experimental-webgl');
    if (webgl == null) {
      throw new Error('webgl error');
    }
    this.gl = webgl;
  }

  /* ライフサイクル */
  /* マウンティングフェーズ */
  public attribLocationPhase(setting :IRenderObjectSetting) {
    const { vbo } = setting;
    for (let i = 0; i < vbo.length; i += 1) {
      // attribの設定
      if (this.program == null) {
        throw Errors.nullPointer('program object');
      }
      const attribLocation = this.findAttribLocation(vbo[i].name);
      if (attribLocation == null) {
        const value = this.gl.getAttribLocation(this.program, vbo[i].name);
        this.addAttrLocation(value, vbo[i].name);
      }
    }
  }

  public createBufferPhase(setting :IRenderObjectSetting) {
    const { vbo } = setting;
    for (let i = 0; i < vbo.length; i += 1) {
      // bufferの作成
      const buffer = this.findBuffer(vbo[i].name);
      if (buffer == null) {
        this.addBuffer(this.createBuffer(vbo[i].data, BUFFER_TYPE.VBO), vbo[i].name);
      }
    }
  }

  public setAttributePhase(setting :IRenderObjectSetting) {
    const { vbo } = setting;
    for (let i = 0; i < vbo.length; i += 1) {
      const targetVBO = this.findBuffer(vbo[i].name);
      const targetAttrib = this.findAttribLocation(vbo[i].name);
      if (targetVBO == null || targetAttrib == null) {
        throw Errors.nullPointer('vbo or attrib');
      }
      this.setAttribute(targetVBO, targetAttrib, vbo[i].size);
    }
  }

  public createIBOPhase(setting :IRenderObjectSetting, iboName: string) {
    if (this.findBuffer(iboName) != null) {
      return;
    }
    const { ibo } = setting;
    const iboBuffer = this.createBuffer(ibo, BUFFER_TYPE.IBO);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, iboBuffer);
    this.addBuffer(iboBuffer, iboName);
  }

  public createUniformPhase(uniformLocationName: string) {
    if (this.program == null) {
      throw Error('not found program');
    }
    const uniLocation = this.gl.getUniformLocation(this.program, uniformLocationName);
    if (uniLocation == null) {
      throw Error('unilocation notfound');
    }
    this.uniLocation = uniLocation;
  }

  public initialRendering(setting :IRenderObjectSetting, uniform: string) {
    this.gl.viewport(0, 0, this.glWidth, this.glHeight);
    // attrib取得
    this.attribLocationPhase(setting);
    // VBOの生成
    this.createBufferPhase(setting);
    // VBO登録
    this.setAttributePhase(setting);
    // IBO生成と登録
    this.createIBOPhase(setting, 'iboSample');
    // uniLocationの登録
    this.createUniformPhase(uniform);
  }

  /* レンダリングフェーズ */
  public render(uniform: Float32Array, iboLength: number) {
    this.gl.clearColor(0.5, 0.2, 0.5, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.uniform(this.uniLocation, uniform);
    this.drawObject(iboLength, 0, BUFFER_TYPE.IBO);
    this.gl.flush();
  }
  /* ライフサイクル */

  public setAttribute(vbo: WebGLBuffer, location: number, size: number) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
    this.gl.enableVertexAttribArray(location);
    this.gl.vertexAttribPointer(location, size, this.gl.FLOAT, false, 0, 0);
  }

  public drawObject(
    dataLength: number,
    size: number,
    type: BUFFER_TYPE,
  ) {
    switch (type) {
      case BUFFER_TYPE.VBO:
        this.gl.drawArrays(this.gl.TRIANGLES, 0, dataLength / size);
        break;
      case BUFFER_TYPE.IBO:
        this.gl.drawElements(this.gl.TRIANGLES, dataLength, this.gl.UNSIGNED_SHORT, 0);
        break;
      default:
        throw Error('type of ???');
    }
  }

  public uniform(
    uniLocation: WebGLUniformLocation | null,
    location: Float32Array,
  ) {
    this.gl.uniformMatrix4fv(uniLocation, false, location);
  }

  public flush() {
    this.gl.flush();
  }

  public addShader(shader: WebGLShader, id: string) {
    this.shaderList.push({
      id,
      shader,
    });
  }

  public findShader(id: string): WebGLShader | null {
    const content = this.shaderList.filter(item => item.id === id)[0];
    if (content == null) {
      return null;
    }
    return content.shader;
  }

  private addBuffer(buffer: WebGLBuffer, id: string) {
    this.bufferList.push({
      buffer,
      id,
    });
  }

  private findBuffer(id: string): WebGLBuffer | null {
    const content = this.bufferList.filter(item => item.id === id)[0];
    if (content == null) {
      return null;
    }
    return content.buffer;
  }

  private addAttrLocation(attr:number, id: string) {
    this.attrLocationList.push({
      location: attr,
      id,
    });
  }

  private findAttribLocation(id: string): number | null {
    const content = this.attrLocationList.filter(item => item.id === id)[0];
    if (content == null) {
      return null;
    }
    return content.location;
  }

  // eslint-disable-next-line consistent-return
  public createShader(vertexSource: string, id: string, type: SHADER_TYPE): WebGLShader {
    let shader: WebGLShader | null = this.findShader(id);
    if (shader != null) {
      return shader;
    }
    switch (type) {
      case 'vertex':
        shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        break;
      case 'fragment':
        shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        break;
      default:
        shader = null;
    }
    if (shader == null) {
      throw Errors.nullPointer('not found shader');
    }
    this.gl.shaderSource(shader, vertexSource);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      throw this.gl.getShaderInfoLog(shader);
    }
    this.addShader(shader, id);
    return shader;
  }

  /**
     * プログラムオブジェクトの生成
     * @param vs
     * @param fs
     */
  public createProgram(vsID: string, fsID: string) {
    const program = this.gl.createProgram();
    if (program == null) {
      throw Errors.nullPointer('create program method');
    }
    this.gl.attachShader(program, this.findShader(vsID));
    this.gl.attachShader(program, this.findShader(fsID));
    this.gl.linkProgram(program);
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      throw this.gl.getProgramInfoLog(program);
    }
    this.gl.useProgram(program);
    this.program = program;
  }

  public deleteProgram() {
    if (this.program == null) {
      return;
    }
    this.gl.deleteProgram(this.program);
  }

  // TODO: WebGLに登録できるバッファは一つまで(らしい)
  /**
   * buffer
   * @param data
   */
  public createBuffer(data: number[], type: BUFFER_TYPE) {
    const buffer = this.gl.createBuffer();
    if (buffer == null) {
      throw Errors.nullPointer(type);
    }
    const target = type === BUFFER_TYPE.VBO
      ? this.gl.ARRAY_BUFFER
      : this.gl.ELEMENT_ARRAY_BUFFER;

    this.gl.bindBuffer(target, buffer);

    const offset = type === BUFFER_TYPE.VBO
      ? new Float32Array(data)
      : new Int16Array(data);

    this.gl.bufferData(target, offset, this.gl.STATIC_DRAW);
    this.gl.bindBuffer(target, null);
    return buffer;
  }
}
