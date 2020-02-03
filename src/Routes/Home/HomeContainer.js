import React from "react";
import HomePresenter from "./HomePresenter";
import { searchNaver } from "../../api";

export default class extends React.Component {
  state = {
    shopData: null,
    error: null,
    loading: true
  };
  componentDidMount() {
    this.getHome();
  }
  getHome = async () => {
    try {
      const {
        data: { items: shopData }
      } = await searchNaver();
      this.setState({
        shopData
      });
    } catch (e) {
      this.setState({
        error: "Can't find app information."
      });
    } finally {
      this.setState({ loading: false });
    }
  };
  render() {
    return <HomePresenter {...this.state} />;
  }
}