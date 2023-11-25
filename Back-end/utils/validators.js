
const isEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return "not in email format"
    }
    return undefined
}


console.log(isEmail('som3amasry@gmail.com'))