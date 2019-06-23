/* eslint-disable no-restricted-syntax */
import {
  Float32Vector2, Float32Vector3, Float32Vector4, Matrix4x4, Matrix2x2,
} from 'matrixgl';
import {
  BUFFER_TYPE, SHADER_TYPE, TypeUniform, IVBOMap, IUnilocationMap, IIBOSetting,
} from '../../constants/interfaces';
import Errors from '../../util/Errors';

/* eslint-disable no-undef */
/* eslint-disable no-bitwise */

export default class BaseGLClass {
  public gl: WebGLRenderingContext;

  public element: HTMLCanvasElement;

  public glWidth: number = 0;

  public glHeight: number = 0;

  public program: WebGLProgram | null;

  /**
   * @param width - width
   * @param height - height
   * @param id - canvas id
   */
  constructor(width: number, height: number, id: string) {
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
    this.program = this.gl.createProgram();

    // カリングと深度テストを有効にする
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    // this.gl.enable(this.gl.CULL_FACE);
  }

  public createProgram(vertex: string, fragment: string) {
    if (this.program == null) throw Errors.nullPointer('web gl program');

    const v = this.createShader(vertex, SHADER_TYPE.VERTEX);
    this.gl.attachShader(this.program, v);

    const f = this.createShader(fragment, SHADER_TYPE.FRAGMENT);
    this.gl.attachShader(this.program, f);

    this.gl.linkProgram(this.program);
    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      throw Error(this.gl.getProgramInfoLog(this.program) || 'program is notfound');
    }
    this.gl.useProgram(this.program);
  }

  public preRenderObject() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  // eslint-disable-next-line class-methods-use-this
  public renderObject(vboMap: IVBOMap, uniLocationMap: IUnilocationMap, ibo: IIBOSetting) {
    if (ibo.buffer == null) return;
    for (const vbo of vboMap) {
      if (vbo[1].buffer == null) return;
      this.setAttribute(vbo[1].buffer, vbo[1].size, vbo[1].vboLocation);
    }

    for (const uniform of uniLocationMap) {
      const { bind, uniLocation } = uniform[1];
      this.setUniformLocation(bind, uniLocation);
    }

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, ibo.buffer);
    this.gl.drawElements(this.gl.TRIANGLES, ibo.data.length, this.gl.UNSIGNED_SHORT, 0);
  }

  public flush() {
    this.gl.flush();
  }

  public setAttribute(vbo: WebGLBuffer, size: number, location: number) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
    this.gl.enableVertexAttribArray(location);
    this.gl.vertexAttribPointer(location, size, this.gl.FLOAT, false, 0, 0);
  }

  public setUniformLocation(bind: WebGLUniformLocation | null, location: TypeUniform) {
    if (location instanceof Float32Vector2) {
      this.gl.uniform2fv(bind, location.values);
    } else if (location instanceof Float32Vector3) {
      this.gl.uniform3fv(bind, location.values);
    } else if (location instanceof Float32Vector4) {
      this.gl.uniform4fv(bind, location.values);
    } else if (location instanceof Matrix2x2) {
      this.gl.uniformMatrix2fv(bind, false, location.values);
    } else if (location instanceof Matrix4x4) {
      this.gl.uniformMatrix4fv(bind, false, location.values);
    }
  }

  public drawObject(dataLength: number, size: number, type: BUFFER_TYPE) {
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

  public createBuffer(data: number[], type: BUFFER_TYPE) {
    const buffer = this.gl.createBuffer();

    if (buffer == null) {
      throw Errors.nullPointer(type);
    }
    const target = type === BUFFER_TYPE.VBO
      ? this.gl.ARRAY_BUFFER
      : this.gl.ELEMENT_ARRAY_BUFFER;
    const offset = type === BUFFER_TYPE.VBO
      ? new Float32Array(data)
      : new Int16Array(data);

    this.gl.bindBuffer(target, buffer);
    this.gl.bufferData(target, offset, this.gl.STATIC_DRAW);
    this.gl.bindBuffer(target, null);
    return buffer;
  }

  public createShader(vertexSource: string, type: SHADER_TYPE): WebGLShader {
    let shader: WebGLShader | null;
    switch (type) {
      case SHADER_TYPE.VERTEX:
        shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        break;
      case SHADER_TYPE.FRAGMENT:
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
    return shader;
  }

  public getAttribLocation(name: string) {
    if (this.program == null) throw Error('null program');
    return this.gl.getAttribLocation(this.program, name);
  }

  public getUniLocation(uniLocationName: string) {
    if (this.program == null) throw Error('null program');
    return this.gl.getUniformLocation(this.program, uniLocationName);
  }
}
