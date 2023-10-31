import React, { useState } from "react";
import styles from "./CustomSelectField.module.css";
import cheveronUp from "../../assets/chevron-up.svg";
import cheveronDown from "../../assets/chevron-down.svg";
import { CustomSelectProps } from "../../utils/types";

const CustomSelect: React.FC<CustomSelectProps> = ({
  optionsList,
  onSelect,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selected, setIsSelected] = useState<string>("Choose one");

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleItemClick = (item: string) => {
    setIsSelected(item);
    setIsActive(false);
    onSelect(item);
  };

  return (
    <div>
      <div className={styles.dropdown}>
        <div
          data-testid="images_dropdown"
          onClick={toggleDropdown}
          className={styles["dropdown-btn"]}
        >
          {selected}
          <span>
            {isActive ? (
              <img src={cheveronUp} alt="chevron up" />
            ) : (
              <img src={cheveronDown} alt="chevron down" />
            )}
          </span>
        </div>
        <div
          className={styles["dropdown-content"]}
          style={{ display: isActive ? "grid" : "none" }}
        >
          {optionsList.map((breed) => (
            <div
              key={breed.id}
              onClick={() => handleItemClick(breed.name)}
              className={styles.item}
            >
              <span>{breed.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
