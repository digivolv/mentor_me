import React from "react";
import PriceSlider from "./PriceSlider";

const FilterPanel = ({ selectedPrice, changePrice }) => {
  return (
    <div>
      <h3>Price Range:</h3>
      <br />

      <PriceSlider value={selectedPrice} changePrice={changePrice} />
    </div>
  );
};

export default FilterPanel;
