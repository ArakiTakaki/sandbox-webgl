import Errors from './Errors';
import Matrix from './Matrix';

const vSource = `
attribute vec3 position;
uniform   mat4 mvpMatrix;

void main(void){
    gl_Position = mvpMatrix * vec4(position, 1.0);
}
`;
// const rgba = [0.0, 0.0, 0.0, 1.0]; // Red, Green, Blue, Alpha
const fSource = `
void main(void) {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

/**
 * WebGLをラップ下クラス
 */
interface ICacheShader {
  id: string;
  shader: WebGLShader;
}
export default class WebGLClass {
  element: HTMLCanvasElement;

  /* WebGLのメインコンポーネント */
  gl: WebGLRenderingContext;

  /* 幅 */
  glWidth: number;

  /* 高さ */
  glHeight: number;

  /* ベクトル数 */
  globalVector: number;

  private shaderList: ICacheShader[] = [];

  /**
   * webglをコントロールするクラス
   * @param width - width
   * @param height - height
   * @param id - canvas id
   */
  public constructor(width: number, height: number, id: string, vector: number) {
    const canvas = document.createElement('canvas');
    this.glWidth = width;
    this.glHeight = height;
    this.globalVector = vector;
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

  public init() {
    this.gl.viewport(0, 0, this.glWidth, this.glHeight);
    this.gl.clearColor(0.5, 0.2, 0.5, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);
  }

  public render(data: number[]) {
    const vertex = this.createShader(vSource, 'v', 'vertex');
    const fragment = this.createShader(fSource, 'f', 'fragment');

    const program = this.createProgram(vertex, fragment);

    const attLocation = this.gl.getAttribLocation(program, 'position');

    const vbo = this.createVBO(data);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);

    this.gl.enableVertexAttribArray(attLocation);
    this.gl.vertexAttribPointer(attLocation, this.globalVector, this.gl.FLOAT, false, 0, 0);

    const uniLocation = this.gl.getUniformLocation(program, 'mvpMatrix');
    // eslint-disable-next-line max-len
    this.gl.uniformMatrix4fv(uniLocation, false, new Float32Array(Matrix.initState));
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    this.gl.flush();
  }

  public createShader(vertexSource: string, id: string, type: 'vertex' | 'fragment'): WebGLShader {
    // 既存のシェーダーはキャッシュから取ってくる
    const tmp = this.shaderList.filter(item => item.id === id)[0];
    if (tmp != null) return tmp.shader;

    let shader: WebGLShader | null = null;
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
    this.shaderList.push({
      id, shader,
    });

    return shader;
  }

  /**
     * プログラムオブジェクトの生成
     * @param vs
     * @param fs
     */
  public createProgram(vs: WebGLShader, fs: WebGLShader) {
    const program = this.gl.createProgram();
    if (program == null) {
      throw Errors.nullPointer('create program method');
    }
    this.gl.attachShader(program, vs);
    this.gl.attachShader(program, fs);
    this.gl.linkProgram(program);
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      throw this.gl.getProgramInfoLog(program);
    }

    this.gl.useProgram(program);

    return program;
  }

  // TODO: WebGLに登録できるバッファは一つまで(らしい)
  /**
   * buffer
   * @param data
   */
  public createVBO(data: number[]) {
    const vbo = this.gl.createBuffer();
    if (vbo == null) {
      throw Errors.nullPointer('null pointer exception to ');
    }
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
    // TODO: WebGLに登録できるバッファは一つまで(らしい)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

    return vbo;
  }

  public renderingBought(path: number[], isFill: boolean = false) {
    const fillAction = isFill ? this.gl.TRIANGLE_STRIP : this.gl.LINE_STRIP;
    this.gl.vertexAttribPointer(this.getVertex(), this.globalVector, this.gl.FLOAT, false, 0, 0);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(path), this.gl.DYNAMIC_DRAW);
    this.gl.drawArrays(fillAction, 0, path.length / this.globalVector);
  }

  private getVertex(): number {
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

    const vShader = this.createShader(vSource, 'v-sample', 'vertex');
    const fShader = this.createShader(fSource, 'h-sample', 'fragment');

    const program = this.createProgram(vShader, fShader);

    const vertex = this.gl.getAttribLocation(program, 'vertex');
    this.gl.enableVertexAttribArray(vertex);

    return vertex;
  }
}
