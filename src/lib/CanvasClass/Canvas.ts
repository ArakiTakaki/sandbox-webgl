/* eslint-disable no-undef */
import Errors from '../../util/Errors';

export default class {
  public canvasElement: HTMLCanvasElement;

  public width: number;

  public height: number;

  public canvasID: string;

  public ctx: CanvasRenderingContext2D;

  constructor(canvasID: string, width: number, height: number) {
    this.canvasElement = document.createElement('canvas');
    this.width = width;
    this.height = height;
    this.canvasElement.setAttribute('width', String(width));
    this.canvasElement.setAttribute('width', String(height));

    this.canvasID = canvasID;
    const ctx = this.canvasElement.getContext('2d');
    if (ctx == null) throw Errors.nullPointer(`canvas element at ID:${canvasID}`);
    this.ctx = ctx;
  }

  /**
   * 描画し、描画したイメージデータを出力する機構
   * @param text 描画したいテキスト
   * @param attributeOption レンダリングオプション
   */
  public getImage(text:string, attributeOption?:{ font?: string, style?: string}): string {
    const option = {
      font: '30px Arial',
      style: 'black',
      ...attributeOption,
    };
    this.ctx.font = option.font;
    this.ctx.fillStyle = option.style;
    this.ctx.fillText(text, 0, 30);
    return this.canvasElement.toDataURL();
  }

  public refresh() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  /**
   * デバッグ用にエレメントをBodyの下部に出力
   */
  public debug() {
    if (document.getElementById(this.canvasID) != null) {
      return;
    }
    // TODO: DAT.guiのような感じにする。
    // const wrap = document.createElement('div');
    // wrap.style.position = 'fixed';
    // wrap.style.bottom = '0';
    // wrap.style.right = '0';
    // const button = document.createElement('button');
    // wrap.appendChild(button);
    // button.addEventListener('click', () => {
    // });
    document.body.appendChild(this.canvasElement);
  }
}
