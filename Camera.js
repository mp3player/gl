class Camera {
    constructor(a,b,c,d){
        let mat = mat4.create()
        mat4.perspective(mat,a,b,c,d)
        this.mat = mat
    }
    render(){
        return this.mat
    }
}
export {Camera}