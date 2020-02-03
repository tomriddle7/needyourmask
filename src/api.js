import axios from "axios";

const api = axios.create();

const mask = "KF%20%EB%A7%88%EC%8A%A4%ED%81%AC";

export const searchNaver = () => api.get(`https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/shop.json?query=${mask}&display=20&start=1&sort=sim`, {
    headers: {
      "X-Naver-Client-Id": "egDfcvMc17HYKdlu03de",
      "X-Naver-Client-Secret": "58Py3Ah5Ib"
    }
  });