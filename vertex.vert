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

out vec3 oColor;
out vec2 oUv;


void main(){
    vec3 pos = (modelViewMatrix * vec4(position,1)).xyz;
    gl_Position = projectionMatrix * vec4(pos,1);

    //先按照点光源色思路去做
    //求法线
    vec3 transformNormal = normalize(normalMatrix * vec4(normal,1)).xyz;

    vec3 ne = normalize(spotPosition - pos);

    // 求夹角
    float angle = max(dot(ne,transformNormal),0.0);

    vec3 sColor = spotLight * angle;

    oColor = vec3(angle);
    // oColor = color * sColor;

    oUv = uv;
}