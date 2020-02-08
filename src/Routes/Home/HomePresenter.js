import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Item from "../../Components/Item";

const Container = styled.div`
  padding: 20px;
`;

const Section = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 20px;
`;

const Label = styled.label``;

const Form = styled.form`
  margin-top: 70px;
`;

const Input = styled.input``;

const Submit = styled.input``;

const HomePresenter = ({
  shopGmarcketData,
  shopElevenData,
  shopNaverData,
  minPrice,
  maxPrice,
  handleChange,
  error,
  loading
}) => {
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Helmet>
        <title></title>
      </Helmet>
      <Form>
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
      </Form>
      <Section>
        {shopGmarcketData && shopGmarcketData.length > 0 && shopGmarcketData.map(shop =>
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
        {shopNaverData && shopNaverData.length > 0 && shopNaverData.map(shop =>
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
        {shopElevenData && shopElevenData.length > 0 && shopElevenData.map(shop =>
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
      </Section>
    </Container>
  );
};

export default HomePresenter;
