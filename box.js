import {GL } from './gl.js'

const vs = `#version 300 es
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
`
const fs = `#version 300 es
    precision mediump float;
    
    in vec3 oColor;
    in vec2 oUv;
    
    uniform sampler2D image;

    out vec4 fColor;
    void main(){
        fColor = vec4(1,0,0,0);
    }

`
let BoxData = {
    position : [ 
        -10, -10,  10,
        10, -10,  10,
        10,  10,  10,
        -10,  10,  10,

        // Back face
        -10, -10, -10,
        -10,  10, -10,
        10,  10, -10,
        10, -10, -10,

        // Top face
        -10,  10, -10,
        -10,  10,  10,
        10,  10,  10,
        10,  10, -10,

        // Bottom face
        -10, -10, -10,
        10, -10, -10,
        10, -10,  10,
        -10, -10,  10,

        // Right face
        10, -10, -10,
        10,  10, -10,
        10,  10,  10,
        10, -10,  10,

        // Left face
        -10, -10, -10,
        -10, -10,  10,
        -10,  10,  10,
        -10,  10, -10
    ],
    color:[],
    uv:[
        // Front
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Back
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Top
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Bottom
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Right
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Left
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0
    ],
    index:[0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23,   // left
    ],
    normal:[
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
   
       // Back
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
   
       // Top
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
   
       // Bottom
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
   
       // Right
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
   
       // Left
       -1.0,  0.0,  0.0,
       -1.0,  0.0,  0.0,
       -1.0,  0.0,  0.0,
       -1.0,  0.0,  0.0
    ]
}

class Box extends GL{
    constructor(gl = new WebGL2RenderingContext,url){
        super(gl,vs,fs)
        this.init()
        if(url)
            this.texture = this.createTexture(url)
        else
            this.texture = null
    }
    init(){
        let vao = this.createVAO()
        this.createEBO(BoxData.index)
        
        this.createVBO(BoxData.position)
        this.setVec3(0)
        this.createVBO(BoxData.normal)
        this.createVBO(BoxData.uv)
        this.setVec2(2)
        
        this.VAO = vao
    }
    render(pm,mv){
        let gl = this.gl
        gl.bindVertexArray(this.VAO)

        gl.useProgram(this.program)
        this.setMat4('projectionMatrix',pm)
        this.setMat4('modelViewMatrix',mv)

        if(this.texture){
            gl.activeTexture(gl.TEXTURE4)
            gl.bindTexture(gl.TEXTURE_2D, this.texture)
            this.setInt('image',4)
        }
        

        gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_SHORT,0)
    }
}

export {Box}