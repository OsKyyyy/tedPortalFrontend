export function setServicesLesson(service, token, noteData){

    let BaseUrl = 'http://127.0.0.1:8000/api/lesson/';

    return new Promise((resolve, reject) =>
    {
        fetch(BaseUrl + service,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(noteData)
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