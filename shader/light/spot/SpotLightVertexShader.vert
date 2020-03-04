#version 300 es
precision mediump float;

layout(location=0)in vec3 position;
layout(location=1)in vec3 color;
layout(location=2)in vec2 uv;
layout(location=3)in vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 normalMatrix;
//环境光混合
// uniform vec3 ambient;
// uniform float ambientIntensity;

//平行光混合
// uniform vec3 directional;               //颜色
// uniform vec3 directionalVector;
// uniform float directionalIntensity;

//点光源混合
uniform vec3 point;
uniform vec3 pointPosition;
uniform float pointIntensity;

out vec3 oColor;
out vec2 oUv;

void main(){
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1);
    //计算环境光混合                环境光
    // vec3 aColor = ambient * ambientIntensity;


    //计算漫反射混合                平行光
    //变换法线  normal = mat * normal
    // vec3 transformNormal = (normalMatrix * vec4(normal,1)).xyz;
    //计算点积  angle = dot(normal,directionalVector)
    // float angle = max(dot(normalize(directionalVector),transformNormal),0.0);
    //混合颜色  dColor = angle * directionalColor * intensity
    // vec3 dColor = directionalIntensity * angle * directional;
    //计算最终颜色  color * (ambient + dColor)

    //变换顶点
    vec3 pos = (modelViewMatrix * vec4(position,1)).xyz;
    gl_Position = projectionMatrix * vec4(pos,1);

    //漫反射混合                    点光源
    //变换法线
    vec3 transformNormal = (normalMatrix * vec4(normal,1)).xyz;
    //计算光线的法线
    vec3 lightNormal = normalize(pointPosition - pos);
    //计算点积
    float angle = max(dot(lightNormal,transformNormal),0.0);
    //计算漫反射颜色
    vec3 pColor = point * angle;
    //计算颜色衰减
    float length = distance(pointPosition,pos);


    oColor = color * pColor * sqrt(length);

    oUv = uv;
}