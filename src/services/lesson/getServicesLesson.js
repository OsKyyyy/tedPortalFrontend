export function getServicesLesson(service, token, userData){

    let BaseUrl = 'http://127.0.0.1:8000/api/lesson/';

    return new Promise((resolve, reject) =>
    {
        fetch(BaseUrl + service + '?' + userData,{
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