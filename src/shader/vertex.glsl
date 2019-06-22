attribute vec3 position;
attribute mat4 matrix;

void main(void){
    gl_Position = vec4(position, 1.0);
}