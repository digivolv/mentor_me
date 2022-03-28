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
  // console.log("EXP LIST:", experienceList);
  return (
    <div>
      <h3>Price Range:</h3>
      <br />
      <br />
      <br />
      <PriceSlider value={selectedPrice} changePrice={changePrice} />
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
      <h3>Rating:</h3>
      <StarRating value={selectedRating} selectToggle={selectRating} /> & up
    </div>
  );
};

export default FilterPanel;
