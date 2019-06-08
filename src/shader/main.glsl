attribute vec3 position;
uniform   mat4 mvpMatrix;

void main(void){
    gl_Position = mvpMatrix * vec4(position, 1.0);
}

void main(void) {
  gl_FragColor = vec4(0.9, 0.7, 1.0, 1.0);
}
