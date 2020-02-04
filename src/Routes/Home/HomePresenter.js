import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Item from "../../Components/Item";

const Container = styled.div`
  padding: 80px 0px;
`;

const Loader = styled.div`
  padding: 80px 0px;
`;

const Label = styled.label``;

const Form = styled.form``;

const Input = styled.input``;

const Submit = styled.input``;

const HomePresenter = ({
  shopElevenData,
  shopNaverData,
  minPrice,
  maxPrice,
  handleChange,
  handleSubmit,
  error,
  loading
}) => {
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="minPrice">minPrice</Label>
        <Input
          type="number"
          name="minPrice"
          placeholder="minPrice"
          value={minPrice}
          onChange={handleChange}
          required
        />
        <Label htmlFor="maxPrice">maxPrice</Label>
        <Input
          type="number"
          name="maxPrice"
          placeholder="maxPrice"
          value={maxPrice}
          onChange={handleChange}
          required
        />
        <Submit type="submit" value="Submit" />
      </Form>
      {shopNaverData.map(shop =>
        Number(shop.price) >= minPrice && Number(shop.price) <= maxPrice ? (
          <Item
            key={shop.id}
            url={shop.url}
            img={shop.img}
            product={shop.product}
            seller={shop.seller}
            price={shop.price}
          />
        ) : (
          <></>
        )
      )}
      {shopElevenData.map(shop =>
        Number(shop.ProductPrice[0]) >= minPrice &&
        Number(shop.ProductPrice[0]) <= maxPrice ? (
          <Item
            key={shop.ProductCode[0]}
            url={shop.DetailPageUrl[0]}
            img={shop.ProductImage200[0]}
            product={shop.ProductName[0]}
            seller={shop.SellerNick[0]}
            price={shop.ProductPrice[0]}
          />
        ) : (
          <></>
        )
      )}
    </Container>
  );
};

export default HomePresenter;
