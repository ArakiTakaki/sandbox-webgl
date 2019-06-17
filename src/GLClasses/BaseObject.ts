import { IVBOSetting, IIBOSetting, IUniLocation } from '../constants/interfaces';

export default class BaseObject {
  private vbo: IVBOSetting[] = [];

  private ibo?: IIBOSetting;

  private uniLocaiton: IUniLocation[] = [];

  private locationIndexMap:{ [key: string]: number; } = {};

  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  addVBO(vbo: IVBOSetting) {
    this.vbo.push(vbo);
  }

  setIBO(ibo: number[]) {
    this.ibo = {
      name: this.name,
      data: ibo,
    };
  }

  get getVBOList() {
    return this.vbo;
  }

  get getIBO() {
    return this.ibo;
  }

  /**
   * @param location
   * @returns - uni locationのIndex
   */
  addUniLocation(location: IUniLocation) {
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
