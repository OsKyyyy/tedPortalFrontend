export function setServicesUser(service, token, userData){

    let BaseUrl = 'http://127.0.0.1:8000/api/';

    return new Promise((resolve, reject) =>
    {
        fetch(BaseUrl + service,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(userData)
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