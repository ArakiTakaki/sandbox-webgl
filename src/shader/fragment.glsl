precision mediump float;

void main( void ) {
	gl_FragColor = vec4(gl_FragCoord.xy / vec2(500., 500.), 1., 1.);
}