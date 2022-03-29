import React from "react";
import PriceSlider from "./PriceSlider";
import ExperienceCheckbox from "./ExperienceCheckbox";
import StarRating from "./StarRating";

const FilterPanel = ({
  selectedPrice,
  changePrice,
  experienceList,
  changeExperience,
  selectedRating,
  selectRating,
}) => {
  return (
    <div>
      <br />
      <h3>Price Range:</h3>
      <br />
      <br />
      <br />
      <PriceSlider value={selectedPrice} changePrice={changePrice} />
      <br />
      <br />
      <h3>Years of Experience:</h3>
      {experienceList.map((experience) => (
        <ExperienceCheckbox
          key={experience.id}
          experience={experience}
          changeChecked={changeExperience}
        />
      ))}
      <br />
      <br />
      <h3>Minimum Rating:</h3>
      <br />
      <StarRating value={selectedRating} selectToggle={selectRating} />
    </div>
  );
};

export default FilterPanel;
