#version 300 es
precision mediump float;

in vec3 oColor;
in vec2 oUv;

uniform sampler2D normalSampler;
uniform float time;

out vec4 fColor;

vec4 getNoise( vec2 uv ) {
	vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
	vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
	vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
	vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
	vec4 noise = texture( normalSampler, uv0 ) +
		texture( normalSampler, uv1 ) +
		texture( normalSampler, uv2 ) +
		texture( normalSampler, uv3 );
	return noise * 0.5 - 1.0;
}

void main(){
    // fColor = vec4(oColor,1);
    vec2 uv = vec2(oUv.x,oUv.y);
    fColor = getNoise(uv);//texture(normalSampler,uv);
    // fColor = vec4(1,0,0,1);
}