#version 300 es
precision mediump float;

#define PI 3.1415926

layout(location=0)in vec3 position;
layout(location=1)in vec3 color;
layout(location=2)in vec2 uv;
layout(location=3)in vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 normalMatrix;

//聚光灯
uniform vec3 spotLight;
uniform vec3 spotPosition;
uniform vec3 spotVector;
uniform float spotIntensity;
uniform float radius;

out vec3 oColor;
out vec2 oUv;


void main(){
    vec3 pos = (modelViewMatrix * vec4(position,1)).xyz;
    gl_Position = projectionMatrix * vec4(pos,1);

    //求法线
    vec3 transformNormal = normalize((normalMatrix * vec4(normal,1)).xyz);
    //求光线方向
    

    oColor = color;

    

    oUv = uv;
}