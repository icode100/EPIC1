const storeToken = (value)=>{
    if(value){
        const {access,refresh} = value;
        localStorage.setItem('access_token',access)
        localStorage.setItem('refresh_token',refresh)
    }
}

const getToken = ()=>{
    let access_token = localStorage.getItem('access_token')
    let refresh_token = localStorage.getItem('refresh_token')
    // console.log({access_token,refresh_token})
    return {access_token,refresh_token}

}

const removeToken = ()=>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}
const storeOutdate = (value)=>{
    if(value){
        const outdate = value;
        console.log(outdate)
        localStorage.setItem('outdate',outdate)
    }
}
const getOutdate = ()=>{
    let outdate = localStorage.getItem('outdate')
    return outdate
}

const removeOutdate = ()=>{
    localStorage.removeItem('outdate')
}
export {storeToken,getToken,removeToken,storeOutdate,getOutdate,removeOutdate}