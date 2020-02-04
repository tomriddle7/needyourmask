import axios from "axios";

const api = axios.create();

const mask = encodeURIComponent("KF 마스크");

export const searchNaver = () => api.get(`https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/shop.json?query=${mask}&display=20&start=1&sort=sim`, {
    headers: {
      "X-Naver-Client-Id": "egDfcvMc17HYKdlu03de",
      "X-Naver-Client-Secret": "58Py3Ah5Ib"
    }
});

export const searchEleven = () => api.get(`https://cors-anywhere.herokuapp.com/http://openapi.11st.co.kr/openapi/OpenApiService.tmall?apiCode=ProductSearch&key=d02ab1e21267f20b591ee64a1758b398&keyword=${mask}&expCnt=1`);