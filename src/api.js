import axios from "axios";

const api = axios.create();

const mask = encodeURIComponent("KF80 KF94 마스크");
const naverID = process.env.REACT_APP_NAVERID;
const naverSecret = process.env.REACT_APP_NAVERSECRET;
const elevenAPI = process.env.REACT_APP_11API;
const googleSheet = process.env.REACT_APP_GOOGLESHEET

export const searchNaver = () => api.get(`https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/shop.json?query=${mask}&display=20&start=1&sort=sim`, {
    headers: {
      "X-Naver-Client-Id": naverID,
      "X-Naver-Client-Secret": naverSecret
    }
});

export const searchEleven = () => api.get(`https://cors-anywhere.herokuapp.com/http://openapi.11st.co.kr/openapi/OpenApiService.tmall?apiCode=ProductSearch&key=${elevenAPI}&keyword=${mask}&expCnt=1`);

export const searchGmarcket = () => api.get(`https://spreadsheets.google.com/feeds/list/${googleSheet}/owvh37h/public/values?alt=json`);