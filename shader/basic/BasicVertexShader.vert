#version 300 es
precision mediump float;

layout(location=0)in vec3 position;
layout(location=1)in vec3 color;
layout(location=2)in vec2 uv;
layout(location=3)in vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 normalMatrix;

out vec3 oColor;
out vec2 oUv;

void main(){
    vec3 pos = (modelViewMatrix * vec4(position,1)).xyz;
    gl_Position = projectionMatrix * vec4(pos,1);

    oColor = color;

    oUv = uv;
}