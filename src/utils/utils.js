import axios from 'axios';



const customFetch = axios.create({
    baseURL: 'https://jobsapi-cujd.onrender.com/api/v1'
});

//add axios interceptor to pass authorization token
customFetch.interceptors.request.use(config => {
    const user =JSON.parse(localStorage.getItem('user')) ;
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
}); 

const capitalizeFirstLetter= (string)=> {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

export { customFetch, capitalizeFirstLetter };