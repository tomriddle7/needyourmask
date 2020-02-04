import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Item from "../../Components/Item";

const Container = styled.div`
  padding: 80px 0px;
`;

const HomePresenter = ({ shopData, error, loading }) => {
  return loading ? (
    <Loader />
  ) : (
    <Container>
      {shopNaverData.map(shop => (
        <Item
          key={shop.id}
          url={shop.url}
          img={shop.img}
          product={shop.product}
          seller={shop.seller}
          price={shop.price}
        />
      ))}
      {shopElevenData.map(shop => (
        <Item
          key={shop.ProductCode[0]}
          url={shop.DetailPageUrl[0]}
          img={shop.ProductImage200[0]}
          product={shop.ProductName[0]}
          seller={shop.SellerNick[0]}
          price={shop.ProductPrice[0]}
        />
      ))}
    </Container>
  );
};

export default HomePresenter;