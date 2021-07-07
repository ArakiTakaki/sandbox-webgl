import {
  Matrix4x4, Float32Vector3, Float32Vector2, Float32Vector4, Matrix3x3, Matrix2x2, Matrix,
} from 'matrixgl';
// eslint-disable-next-line import/no-cycle

export enum BUFFER_TYPE {
  VBO = 'vbo',
  IBO = 'ibo',
}

export enum SHADER_TYPE {
  VERTEX = 'vertex',
  FRAGMENT = 'fragment',
}

export interface IVBOSetting {
  name: string;
  data: number[];
  size: number;
  vboLocation: number;
  buffer?: WebGLBuffer;
}

export interface IRenderObjectSetting {
  vbo: IVBOSetting[];
  ibo: IIBOSetting;
  uniLocations: IUniLocation[];
}

export interface IIBOSetting {
  name: string;
  data: number[];
  buffer?: WebGLBuffer;
}

export type TypeUniform =
  | Float32Vector2
  | Float32Vector3
  | Float32Vector4
  | Matrix
  | Matrix2x2
  | Matrix3x3
  | Matrix4x4;

export interface IUniLocation {
  name: string;
  uniLocation: TypeUniform;
  bind: WebGLUniformLocation | null;
}

export type IVBOMap = Map<string, IVBOSetting>;
export type IUnilocationMap = Map<string, IUniLocation>;

export interface ICacheShader {
  id: string;
  shader: WebGLShader;
}

export interface ICacheBuffer {
  id: string;
  buffer: WebGLBuffer;
}

export interface IAttribLocation {
  id: string;
  location: number;
}

export interface IUniLocationList {
  name: string;
  uniLocation: WebGLUniformLocation;
  attLocation: number;
}

export interface IBaseSetting {
  addVBO(vbo: IVBOSetting): void;
  getVBO(name: string): IVBOSetting;
  getVBOList(): IVBOSetting[];

  setIBO(ibo: number[]): void;
  getIBO(): IIBOSetting | undefined;
  getIBODataLength():number;

  addUniLocation(location: IUniLocation): void;
  getAllUniLocation(): IUniLocation[];
}
