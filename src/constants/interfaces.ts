export interface IVBOSetting {
  name: string;
  data: number[];
  size: number;
}

export interface IRenderObjectSetting {
  vbo: IVBOSetting[];
  ibo: number[]
}

export default 'test';
