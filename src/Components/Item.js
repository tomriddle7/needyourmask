import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled("div")`
  font-size: 12px;
  cursor:pointer;
  width: 200px;
  padding: 0px 20px;
`;

const Image = styled.img`
  display: inline;
  width: 180px;
  height: 180px;
  object-fit: fill;
  border-radius: 4px;
`;

const Product = styled.span`
  display: block;
  margin-bottom: 7px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
`;

const Seller = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
`;

const Price = styled.span`
  display: block;
  margin-bottom: 7px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
`;

const Item = ({ url, img, product, seller, price }) => (
  <Container onClick={() => {window.open(url, '_newtab')}}>
    <Image src={img}/>
    <Product>{product.length > 14 ? `${product.substring(0, 14)}...` : product}</Product>
    <Seller>{seller}</Seller>
    <Price>{price}원</Price>
  </Container>
);

Item.propTypes = {
  url: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  seller: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default Item;