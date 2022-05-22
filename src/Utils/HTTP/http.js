import axios from 'axios';

export default class HTTP {
    static get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    static post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    static delete(url) {
        return new Promise((resolve, reject) => {
            axios.delete(url)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    static put(url, data) {
        return new Promise((resolve, reject) => {
            axios.put(url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    static patch(url, data) {
        return new Promise((resolve, reject) => {
            axios.patch(url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}