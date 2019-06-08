const vSource = `
    precision mediump float;
    attribute vec2 vertex;
    void main(void) {
        gl_Position = vec4(vertex, 0.0, 1.0);
    }
`;
const rgba = [0.0, 0.0, 0.0, 1.0]; // Red, Green, Blue, Alpha
const fSource = `
    precision mediump float;
    void main(void) {
        gl_FragColor = vec4( ${rgba.join(",")} );
    }
`;

const rgba2 = [0.0, 0.0, 0.0, 0.01]; // Red, Green, Blue, Alpha
const fSource2 = `
    precision mediump float;
    void main(void) {
        gl_FragColor = vec4( ${rgba.join(",")} );
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
    gl: WebGLRenderingContext;
    glWidth: number;
    glHeight: number;
    private _shaderList: ICacheShader[] = [];
    public constructor(width: number, height: number, id: string) {
        const canvas = document.createElement('canvas');
        this.glWidth = width;
        this.glHeight = height;
        canvas.setAttribute('width', String(width));
        canvas.setAttribute('height', String(height));
        canvas.setAttribute('id', id)
        document.body.appendChild(canvas);
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw 'create canvas error';
        }
        this.element = canvas;
        const webgl = this.element.getContext('webgl')  || this.element.getContext("experimental-webgl");
        if ( webgl == null) {
            throw 'webgl error';
        }
        webgl.viewport(0, 0, width, height);
        this.gl = webgl;
        this.gl.clearColor(1.0, 0.0, 0.0, 1.0);
    }

    public renderingBought(path: number[], isFill: boolean = false) {
        const fillAction = isFill ? this.gl.TRIANGLE_STRIP : this.gl.LINE_STRIP;
        this.gl.vertexAttribPointer(this._getVertex(), 3, this.gl.FLOAT, false, 0, 0);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(path), this.gl.DYNAMIC_DRAW);
        this.gl.drawArrays(fillAction, 0, path.length/3);
    }

    public createShader(vertexSource: string, id: string,type: 'vertex' | 'fragment'): WebGLShader {
        // 既存のシェーダーはキャッシュから取ってくる
        const tmp = this._shaderList.filter(item => item.id === id)[0];
        if (tmp != null) return tmp.shader;

        let shader: WebGLShader | null;
        switch (type) {
            case 'vertex':
                shader = this.gl.createShader(this.gl.VERTEX_SHADER);
                break;
            case 'fragment':
                shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
                break;
            default:
                throw '謎のシェーダーです';
        }
        if (shader == null ) {
            throw 'シェーダーが存在してません';
        }
        this.gl.shaderSource(shader, vertexSource);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            throw this.gl.getShaderInfoLog(shader);
        }
        this._shaderList.push({
            id:id, shader:shader
        });
        return shader
    }

    /**
     * プログラムオブジェクトの生成
     * @param vs
     * @param fs
     */
    public createProgram(vs: WebGLShader, fs: WebGLShader) {
        const program = this.gl.createProgram();
        if (program == null) {
            throw 'null pointer exception';
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
    public createBuffer(data: number[]) {
        const vbo = this.gl.createBuffer();
        if (vbo == null) {
            throw 'null pointer exception to bufferObject';
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
        // TODO: WebGLに登録できるバッファは一つまで(らしい)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        return vbo;
    }

    private _getVertex(): number {
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

        const vShader = this.createShader(vSource, 'v-sample', 'vertex');
        const fShader = this.createShader(fSource, 'h-sample','fragment');

        const program = this.createProgram(vShader, fShader);

        const vertex = this.gl.getAttribLocation(program, "vertex");
        this.gl.enableVertexAttribArray(vertex);
        return vertex;
    }
}

/**
 * memo
 * シェーダにはIDが振られており、シェーダ
 */