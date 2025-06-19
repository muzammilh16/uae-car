export const KEY_USER = 'KEY_USER';

export const KEY_TOKEN = 'KEY_TOKEN';


export const setData = async (key, data) => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem(key, data);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

export const getData = async (key) => {
    return new Promise((resolve) => {
        try {
            const value = localStorage.getItem(key);
            resolve(value !== null ? value : null);
        } catch (error) {
            resolve(null);
        }
    });
};

export const removeData = async (key) => {
    return new Promise((resolve) => {
        try {
            localStorage.removeItem(key);
            resolve(true);
        } catch (error) {
            resolve(null);
        }
    });
};

export const clearSharedPref = async () => {
    return new Promise((resolve) => {
        try {
            localStorage.clear();
            resolve(true);
        } catch (error) {
            resolve(null);
        }
    });
};





