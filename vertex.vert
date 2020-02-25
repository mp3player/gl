#version 300 es
precision mediump float;

layout(location=0)in vec3 position;
layout(location=1)in vec3 color;
layout(location=2)in vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

out vec3 oColor;
out vec2 oUv;

void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1);
    oColor = color;
    oUv = uv;
}