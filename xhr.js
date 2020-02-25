function xhr(url,fn){
    let xhr = new XMLHttpRequest()

    return new Promise((fn,rej) =>{
        xhr.open('get',url)
        xhr.send()

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                fn(xhr.responseText)
            }
        }
    })
}

export {xhr}