import React from "react";
import HomePresenter from "./HomePresenter";
import { searchGmarcket, searchEleven, searchTmon, searchWemakeprice, searchNaver } from "../../api";
import { parseString } from "xml2js";

export default class extends React.Component {
  state = {
    shopGmarcketData: null,
    shopElevenData: null,
    shopTmonData: null,
    shopWemakepriceData: null,
    shopNaverData: null,
    shopData: null,
    minPrice: 0,
    maxPrice: 100000,
    error: null,
    loading: true
  };
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };
  componentDidMount() {
    this.getGmarcketShop();
  };
  getGmarcketShop = async () => {
    try {
      const {
        data: { feed: { entry: shopGmarcketData } }
      } = await searchGmarcket();
      const gmarcketMap = shopGmarcketData.map(item => {
        let data = {};
        let jsonString = JSON.stringify(item);
        let tbString = JSON.parse(jsonString);
        data.id = tbString.gsx$productid.$t;
        data.product = tbString.gsx$product.$t;
        data.img = tbString.gsx$img.$t;
        data.url = tbString.gsx$url.$t;
        data.seller = tbString.gsx$seller.$t;
        data.price = tbString.gsx$price.$t.replace(",", "");
        return data;
      });
      this.setState({
        shopGmarcketData: gmarcketMap
      });
    } catch (e) {
      this.setState({
        error: "Can't find app information."
      });
    } finally {
      this.getElevenShop();
    }
  };
  getElevenShop = async () => {
    try {
      const { data: shopElevenData } = await searchEleven();
      let elevenMap;
      parseString(shopElevenData, function(err, result) {
        elevenMap = result.ProductSearchResponse.Products[0].Product;
      });
      /*elevenMap = elevenMap.map(item => {
        item.id = item.ProductCode[0];
        delete item.ProductName;
        item.product = item.ProductName[0];
        delete item.ProductName;
        item.img = item.ProductImage200[0];
        delete item.ProductImage200;
        item.url = item.DetailPageUrl[0];
        delete item.DetailPageUrl;
        item.seller = item.SellerNick[0];
        delete item.SellerNick;
        item.price = item.ProductPrice[0];
        delete item.ProductPrice;
        return item;
      });*/
      this.setState({
        shopElevenData: elevenMap
      });
    } catch (e) {
      this.setState({
        error: "Can't find app information."
      });
    } finally {
      this.getTmonShop();
    }
  };
  getTmonShop = async () => {
    try {
      const {
        data: { data: shopTmonData }
      } = await searchTmon();
      const tmonMap = shopTmonData.searchDeals.map(item => {
        item.id = item.searchDealResponse.searchInfo.id;
        delete item.searchDealResponse.searchInfo.id;
        item.product = item.searchDealResponse.dealInfo.titleName;
        delete item.searchDealResponse.dealInfo.titleName;
        item.img = item.searchDealResponse.dealInfo.imageInfo.pc3ColImageUrl;
        delete item.searchDealResponse.dealInfo.imageInfo.pc3ColImageUrl;
        item.url = item.extraDealInfo.detailUrl;
        delete item.extraDealInfo.detailUrl;
        item.seller = "티몬";
        item.price = item.searchDealResponse.dealInfo.priceInfo.price;
        delete item.searchDealResponse.dealInfo.priceInfo.price;
        return item;
      });
      this.setState({
        shopTmonData: tmonMap
      });
    } catch (e) {
      this.setState({
        error: "Can't find app information."
      });
    } finally {
      this.getWemakepriceShop();
    }
  };
  getWemakepriceShop = async () => {
    try {
      const {
        data: { data: shopWemakePriceData }
      } = await searchWemakeprice();
      const wemakepriceMap = shopWemakePriceData.data.map(item => {
        item.id = item.price;
        item.product = item.title;
        delete item.title;
        item.img = item.imageUrl;
        delete item.imageUrl;
        item.url = item.link;
        delete item.link;
        item.seller = item.vender;
        delete item.vender;
        return item;
      });
      this.setState({
        shopWemakepriceData: wemakepriceMap
      });
    } catch (e) {
      this.setState({
        error: "Can't find app information."
      });
    } finally {
      this.getNaverShop();
    }
  };
  getNaverShop = async () => {
    try {
      const {
        data: { items: shopNaverData }
      } = await searchNaver();
      const naverMap = shopNaverData.map(item => {
        item.id = item.productId;
        delete item.productId;
        item.product = item.title;
        delete item.title;
        item.img = item.image;
        delete item.image;
        item.url = item.link;
        delete item.link;
        item.seller = item.mallName;
        delete item.mallName;
        item.price = item.lprice;
        delete item.lprice;
        return item;
      });
      this.setState({
        shopNaverData: naverMap
      });
    } catch (e) {
      this.setState({
        error: "Can't find app information."
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  };
  render() {
    const {
      shopGmarcketData,
      shopElevenData,
      shopTmonData,
      shopWemakepriceData,
      shopNaverData,
      shopData,
      minPrice,
      maxPrice,
      loading,
      error
    } = this.state;
    return (
      <HomePresenter
        shopGmarcketData={shopGmarcketData}
        shopElevenData={shopElevenData}
        shopTmonData={shopTmonData}
        shopWemakepriceData={shopWemakepriceData}
        shopNaverData={shopNaverData}
        shopData={shopData}
        minPrice={minPrice}
        maxPrice={maxPrice}
        loading={loading}
        error={error}
        handleChange={this.handleChange}
      />
    );
  }
}
