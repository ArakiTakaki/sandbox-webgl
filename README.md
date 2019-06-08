# WebGL本格入門

## シェーダーとは]
固定機能パイプラインというものに一任する

### 頂点シェーダー　またはバーテックスシェーダー
　ポリゴンの情報を扱う
　vshader

### フラグメントシェーダー　またはピクセルシェーダー
　描画されるピクセルを扱う
　fshader

## 実際の記述方法
```html
 <script id="vshader" type="x-shader/x-vertex">
     ※頂点シェーダのソース
 </script>
 
 <script id="fshader" type="x-shader/x-fragment">
     ※フラグメントシェーダのソース
 </script>
 
 もしくは
 
 <script type="javascript">
 const vshader = `
   ※頂点シェーダのソース
 `;
 
 const fshader = `
   ※フラグメントシェーダのソース
 `;
 </script>
```

画面の初期化 `gl.clear(gl.COLOR_BUFFER_BIT);`

色のクリア `gl.clearColor(0.0, 0.0, 0.0, 1.0);`

OpenGLなどでは便利なライブラリが行列計算をおこなってくれるがWebGLでは存在していないため、自前で作る必要がある

minMatrix.js 



