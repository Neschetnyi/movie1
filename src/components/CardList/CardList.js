import React from "react";
import Card from "./Сard/Сard";
import "./CardList.css";

function CardList() {
  let cardArr = [<Card />, <Card />, <Card />, <Card />, <Card />, <Card />];
  return <div className="CardList">{cardArr}</div>;
}

export default CardList;
