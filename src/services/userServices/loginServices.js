export function loginServices(userData){

    let BaseUrl = 'http://127.0.0.1:8000/api/login';

    return new Promise((resolve, reject) =>
    {
        fetch(BaseUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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