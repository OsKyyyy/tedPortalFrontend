export function logoutServices(token){

    let BaseUrl = 'http://127.0.0.1:8000/api/logout';

    return new Promise((resolve, reject) =>
    {
        fetch(BaseUrl,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => response.json())
        .then((result) => {
            resolve(result);
        })
        .catch((error) => {
            reject(error);
        })
    });
}