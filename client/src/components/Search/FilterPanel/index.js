import React from "react";
import PriceSlider from "./PriceSlider";
import ExperienceCheckbox from "./ExperienceCheckbox";
import StarRating from "./StarRating";

const FilterPanel = ({
  selectedPrice,
  changePrice,
  // experiences,
  // changeExperience,
}) => {
  return (
    <div>
      <h3>Price Range:</h3>
      <br />
      <PriceSlider value={selectedPrice} changePrice={changePrice} />
      <h3>Years of Experience:</h3>
      <ExperienceCheckbox />
      <h3>Rating:</h3>
      <StarRating />
    </div>
  );
};

export default FilterPanel;
