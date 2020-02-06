import React from "react";
import HomePresenter from "./HomePresenter";
import { searchGmarcket, searchEleven, searchNaver } from "../../api";
import { parseString } from "xml2js";

export default class extends React.Component {
  state = {
    shopGmarcketData: null,
    shopElevenData: null,
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
        return JSON.parse(JSON.stringify(item.gsx$_cokwr.$t));
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
      shopElevenData,
      shopNaverData,
      shopData,
      minPrice,
      maxPrice,
      loading,
      error
    } = this.state;
    return (
      <HomePresenter
        shopElevenData={shopElevenData}
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
