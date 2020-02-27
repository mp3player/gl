import {GL } from './gl.js'

const vs = `#version 300 es
    precision mediump float;
    layout(location=0)in vec3 position;
    layout(location=1)in vec3 color;
    layout(location=2)in vec3 uv;

    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;

    out frag{
        vec3 oColor;
        vec2 oUv;
    };

    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1);

        oColor = color;
        oUv = uv;
    }
`
const fs = `#version 300 es
    precision mediump float;
    
    in frag {
        vec3 oColor;
        vec2 oUv;
    }

    uniform sampler2D image;

    out vec4 fColor;
    void main(){
        fColor = vec3(1,0,0,0);
    }

`
let BoxData = {
    position : [],
    color:[],
    uv:[],
    index:[],

}

class Box extends GL{
    constructor(gl = new WebGL2RenderingContext){
        this.gl = gl
        this.program = this.initProgram(vs,fs)
    }

}

export {Box}