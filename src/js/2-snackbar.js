import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form); 
    const delay = formData.get('delay'); 
    const state = formData.get('state'); 

    if (!delay || !state || delay == '0') { 
        iziToast.error({
            title: '❌ Error',
            message: 'Введіть затримку',
            position: 'topRight'
        });
        return;
    }

    createPromise(delay, state)
        .then(successMessage => {
            iziToast.success({
                title: '✅ Success',
                message: successMessage,
                position: 'topRight'
            });
        })
        .catch(errorMessage => {
            iziToast.error({
                title: '❌ Error',
                message: errorMessage,
                position: 'topRight'
            });
        });
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(`Fulfilled promise in ${delay} ms`);
            } else {
                reject(`Rejected promise in ${delay} ms`);
        }
        }, delay);
    });
}
