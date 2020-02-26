function initShader(gl,type,source){
    const shader = gl.createShader(type)
    gl.shaderSource(shader,source)
    gl.compileShader(shader)

    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
        console.error(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
    }
    return shader
}
function initProgram(gl,vs,fs){
    let program = gl.createProgram()
    let v = initShader(gl,gl.VERTEX_SHADER,vs)
    let f = initShader(gl,gl.FRAGMENT_SHADER,fs)

    gl.attachShader(program,v)
    gl.attachShader(program,f)

    gl.linkProgram(program)

    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
        console.error(gl.getProgramInfoLog(program))
        return null
    }
    return program
}

class GL{
    constructor(gl,vs,fs){
        this.gl = gl
        this.vs = vs
        this.fs = fs
        this.program = this.initProgram(this.vs,this.fs)
    }
    initProgram(vs,fs){
        let gl = this.gl
        let program = gl.createProgram()
        let v = initShader(gl,gl.VERTEX_SHADER,vs)
        let f = initShader(gl,gl.FRAGMENT_SHADER,fs)
    
        gl.attachShader(program,v)
        gl.attachShader(program,f)
    
        gl.linkProgram(program)
    
        if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
            console.error(gl.getProgramInfoLog(program))
            return null
        }
        return program
    }
    //顶点数组对象
    createVAO(){
        let gl = this.gl
        let vao = gl.createVertexArray()
        gl.bindVertexArray(vao)
        return vao
    }
    //顶点缓冲对象
    createVBO(data){
        let gl = this.gl
        let vbo = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER,vbo)
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW)

        return vbo
    }
    //索引缓冲对象
    createEBO(data){
        let gl = this.gl
        let ebo = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ebo)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(data),gl.STATIC_DRAW)

        return ebo
    }
    //帧缓冲对象
    createFBO(width,height){
        let gl = this.gl
        let framebuffer = gl.createFramebuffer();

        // 新建纹理对象作为帧缓冲区的颜色缓冲区对象
        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        // 新建渲染缓冲区对象作为帧缓冲区的深度缓冲区对象
        var depthBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);

        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

        // 检测帧缓冲区对象的配置状态是否成功
        var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (gl.FRAMEBUFFER_COMPLETE !== e) {
            console.log('Frame buffer object is incomplete: ' + e.toString());
            return;
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);

        framebuffer.texture = texture

        return framebuffer
    }
    //创建贴图
    createTexture(url){
        let gl = this.gl

        let texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D,texture)
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([255,0,0,255]))
        gl.bindTexture(gl.TEXTURE_2D,null)
    
        let img = new Image()
        img.onload = function(){
            gl.bindTexture(gl.TEXTURE_2D,texture)
            gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,this)
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1)
            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT)
            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT)
            gl.bindTexture(gl.TEXTURE_2D,null)
        }
        img.src = url
    
        return texture
    }

    setVec2(index){
        let gl = this.gl
        gl.vertexAttribPointer(index,2,gl.FLOAT, gl.FALSE, 0,0)
        gl.enableVertexAttribArray(index)
    }
    setVec3(index){
        let gl = this.gl
        gl.vertexAttribPointer(index,3,gl.FLOAT,gl.FALSE,0,0)
        gl.enableVertexAttribArray(index)
    }
    setInt(name,value){
        let gl = this.gl
        let program = this.program
        let p = gl.getUniformLocation(program, name)
        gl.uniform1i(p, value)
    }
    setFloat(name,value){
        let gl = this.gl
        let program = this.program
        let p = gl.getUniformLocation(program,name)
        gl.uniform1f(p,value)
    }
    setMat3(name,value){
        let gl = this.gl
        let program = this.program
        let p = gl.getUniformLocation(program,name)
        gl.uniformMatrix3fv(p,false, value)
    }
    setMat4(name,value){
        let gl = this.gl
        let program = this.program
        let p = gl.getUniformLocation(this.program,name)
        gl.uniformMatrix4fv(p,false,value)
    }
    clear(r=0,g=0,b=0,a=1){
        let gl = this.gl
        gl.clearColor(r,g,b,a)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.enable(gl.DEPTH_TEST)
    }
    render(camera,mv){
        let gl = this.gl
        this.clear()
        //渲染
    }
}

export {GL,initProgram}