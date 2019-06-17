import { IVBOSetting, IIBOSetting, IUniLocation } from '../constants/interfaces';

export default class BaseObject {
  private vbo: IVBOSetting[] = [];

  private ibo: IIBOSetting;

  private uniLocaiton: IUniLocation[] = [];

  private locationIndexMap:{ [key: string]: number; } = {};

  constructor(vbo: IVBOSetting[], ibo: IIBOSetting) {
    this.vbo = vbo;
    this.ibo = ibo;
  }

  get getVBO() {
    return this.vbo;
  }

  get getIBO() {
    return this.ibo;
  }

  /**
   * @param location
   * @returns - uni locationのIndex
   */
  setUniLocation(location: IUniLocation) {
    this.uniLocaiton.push(location);
    this.locationIndexMap[location.name] = this.uniLocaiton.length - 1;
  }

  getAllUniLocation(): IUniLocation[] {
    return this.uniLocaiton;
  }

  getUniLocation(name: string): IUniLocation {
    const location = this.uniLocaiton[this.locationIndexMap[name]];
    if (location == null) throw Error('notfound uni location');
    return location;
  }
}
