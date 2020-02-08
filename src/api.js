import axios from "axios";

const api = axios.create();

const mask = encodeURIComponent("KF80 KF94 마스크");

export const searchNaver = () => api.get(`https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/shop.json?query=${mask}&display=20&start=1&sort=sim`, {
    headers: {
      "X-Naver-Client-Id": "egDfcvMc17HYKdlu03de",
      "X-Naver-Client-Secret": "58Py3Ah5Ib"
    }
});

export const searchEleven = () => api.get(`https://cors-anywhere.herokuapp.com/http://openapi.11st.co.kr/openapi/OpenApiService.tmall?apiCode=ProductSearch&key=d02ab1e21267f20b591ee64a1758b398&keyword=${mask}&expCnt=1`);

export const searchGmarcket = () => api.get(`https://spreadsheets.google.com/feeds/list/1iJlUDkWEOF4537bo03u1EVKJY7gduCnDp9EZ9ODxOlA/owvh37h/public/values?alt=json`);