#version 300 es
precision mediump float;

in vec3 oColor;
in vec2 oUv;

uniform sampler2D normalSampler;

out vec4 fColor;

void main(){
    // fColor = vec4(oColor,1);
    vec2 uv = vec2(oUv.x,oUv.y);
    vec4 color = texture(normalSampler,oUv);
    fColor = color * vec4(oColor,1);
    // fColor = vec4(1,0,0,1);
}