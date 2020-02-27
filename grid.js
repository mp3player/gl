import {GL} from './gl.js'


let xLine = {
    position:[
        // [
        //     -100,0,0,
        //     100,0,0
        // ]
    ],
    color:[
        1,0,0,
        1,0,0
    ]
}
let yLine = {
    position:[
        [
            0,-100,0,
            0,100,0
        ]
    ],
    color:[
        0,1,0,
        0,1,0
    ]
}

class Grid extends GL {
    constructor(gl = new WebGL2RenderingContext){
        const vs = `#version 300 es
            precision mediump float;

            layout(location = 0)in vec3 position;
            layout(location = 1)in vec3 color;

            uniform mat4 projectionMatrix;
            uniform mat4 modelViewMatrix;

            out vec3 oColor;

            void main(){
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1);
                oColor = color;
            }
        `

        const fs = `#version 300 es
            precision mediump float;

            in vec3 oColor;

            out vec4 fColor;
            void main(){
                fColor = vec4(oColor,1);
            }
        `
        super(gl,vs,fs)
        this.xVAOs = []
        this.yVAOs = []
        this.init()
    }
    init(){
        //将数据进行拷贝生成，附加10条数据
        // -10,0,0,
        // 10,0,0
        for(let i =1;i<20;i++){
            if(i % 2 == 0){
                xLine.position.push([
                    -100,i * 5,0,
                    100,i * 5,0
                ])
                yLine.position.push([
                    i * 5,-100,-0,
                    i * 5,100,0
                ])
            }  
            else{
                xLine.position.push([
                    -100,-i * 5,0,
                    100,-i * 5,0
                ])
                yLine.position.push([
                    -i * 5,-100,0,
                    -i * 5,100,0
                ])
            }
                
        }
        //设置vao
        let gl = this.gl
        for(let i=0;i<xLine.position.length;i++){
            let vao = this.createVAO()
            this.createVBO(xLine.position[i])
            this.setVec3(0)
            this.createVBO(xLine.color)
            this.setVec3(1)
            
            gl.bindVertexArray(null)
            this.xVAOs.push(vao)

            let vao1 = this.createVAO()
            this.createVBO(yLine.position[i])
            this.setVec3(0)
            this.createVBO(yLine.color)
            this.setVec3(1)
            this.yVAOs.push(vao1)
        }
    }
    getTexture(pm,mv){
        let gl = this.gl
        let fbo = this.createFBO(innerWidth / 2,innerHeight / 2)
        
        gl.bindFramebuffer(gl.FRAMEBUFFER,fbo)
        this.render(pm,mv)
        gl.bindFramebuffer(gl.FRAMEBUFFER,null)
        return fbo.texture
    }
    render(pm,mv){
        let gl = this.gl

        for(let i in this.xVAOs){
            gl.bindVertexArray(this.xVAOs[i])
            gl.useProgram(this.program)
            this.setMat4('projectionMatrix',pm)
            this.setMat4('modelViewMatrix',mv)

            gl.drawArrays(gl.LINES, 0, 2)

            gl.bindVertexArray(this.yVAOs[i])
            gl.useProgram(this.program)
            this.setMat4('projectionMatrix',pm)
            this.setMat4('modelViewMatrix',mv)

            gl.drawArrays(gl.LINES, 0, 2)
        }
        
    }
}

export {Grid}