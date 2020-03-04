#version 300 es
precision mediump float;

in vec3 oColor;
in vec2 oUv;

uniform sampler2D normalSampler;

out vec4 fColor;

void main(){
    vec2 uv = vec2(oUv.x,oUv.y);
    vec4 color = texture(normalSampler,oUv);
    fColor = color * vec4(oColor,1);
}