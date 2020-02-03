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
      {shopData.map(shop => (
            <Item
              url={shop.link}
              img={shop.image}
              product={shop.title}
              seller={shop.mallName}
              price={shop.lprice}
            />
        ))}
    </Container>
  );
};

export default HomePresenter;