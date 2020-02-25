#version 300 es
precision mediump float;

in vec3 oColor;
in vec2 oUv;

uniform sampler2D uTexture;

out vec4 fColor;
void main(){
    // fColor = vec4(oColor,1);
    vec2 uv = vec2(oUv.x,oUv.y);
    fColor = texture(uTexture,uv);
}