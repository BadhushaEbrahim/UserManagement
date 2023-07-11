
    const signupvalidate=(email)=>{
    if(!email.match(/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/))
    {
        return false;
    } else {
        return true;
    }
}

module.exports={signupvalidate};
