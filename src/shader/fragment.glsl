precision mediump float;

uniform vec2 mouse;

void main( void ) {
	gl_FragColor = vec4(gl_FragCoord.xy / vec2(600., 600.) / mouse.xy, .5, 1.);
}