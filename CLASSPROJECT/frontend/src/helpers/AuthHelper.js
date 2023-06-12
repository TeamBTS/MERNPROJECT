export function isUserLoggedIn(){
    let userStatus = localStorage.getItem('user');
    if(userStatus)
    {
        return true;
    }else
    {
        return false;
    }
}

