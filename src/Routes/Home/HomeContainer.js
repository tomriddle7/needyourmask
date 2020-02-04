import React from "react";
import HomePresenter from "./HomePresenter";
import { searchEleven, searchNaver } from "../../api";
import { parseString } from "xml2js";

export default class extends React.Component {
  state = {
    shopElevenData: null,
    shopNaverData: null,
    shopData: null,
    error: null,
    loading: true
  };
  componentDidMount() {
    this.getElevenShop();
  }
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
      console.log(this.state);
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
    return <HomePresenter {...this.state} />;
  }
}
