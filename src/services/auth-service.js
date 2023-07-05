class AuthService{
    setToken(token){
        localStorage.setItem("auth-token", JSON.stringify(token))
    }
    getToken(){
        return localStorage.getItem("auth-token");
    }
    deleteToken(){
        localStorage.removeItem("auth-token");
    }
    getUser(){
        return localStorage.getItem("email");
    }
    getUserInitial(){
        let str=this.getUser();
        return str?.substring(0,1)??null
       
    }
}
export default AuthService;