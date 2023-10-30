import React, { useEffect, useState, useMemo } from "react";
import styles from "./PageTwo.module.css";
import CustomSelect from "../../CustomSelectField/CustonSelectField";
import useFetch from "./../../../utils/hooks/useFetch";
import Loader from "../../Loader/Loader";
import Error from "../../Error/Error";

interface PageTwoProps {
  content: React.ReactNode;
}

const PageTwo: React.FC<PageTwoProps> = ({ content }) => {
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [displayCount, setDisplayCount] = useState<number>(8);

  const breedImagesFetch = useFetch(
    selectedBreed ? `https://dog.ceo/api/breed/${selectedBreed}/images` : ""
  );

  const images = breedImagesFetch.data?.message;

  const allBreedsFetch = useFetch("https://dog.ceo/api/breeds/list/all");

  const handleBreedChange = (selectedBreed: string) => {
    setSelectedBreed(selectedBreed);
    breedImagesFetch.fetchData();
  };

  useEffect(() => {
    allBreedsFetch.fetchData();
  }, [allBreedsFetch]);

  const optionsList = useMemo(() => {
    return allBreedsFetch.isLoading
      ? []
      : Object.keys(allBreedsFetch.data?.message || {}).map((breed, index) => ({
          id: index,
          name: breed,
        }));
  }, [allBreedsFetch.isLoading, allBreedsFetch.data]);

  return (
    <div>
      <h1 className="heading">{content}</h1>

      <div className={styles.pageTwo}>
        <CustomSelect
          defaultText="Select a breed"
          optionsList={optionsList}
          onSelect={handleBreedChange}
        />

        <ul className={styles["dog-list"]}>
          {breedImagesFetch.isLoading ? (
            <Loader />
          ) : breedImagesFetch.error ? (
            <Error error={breedImagesFetch.error} />
          ) : (
            Array.isArray(images) &&
            images.slice(0, displayCount).map((img: string, index: number) => (
              <li key={index}>
                <img src={img} alt="dog breed" />
              </li>
            ))
          )}
        </ul>
      </div>
      {Array.isArray(images) && images.length > displayCount && (
        <button
          style={{ color: "white" }}
          onClick={() => setDisplayCount(displayCount + 12)}
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default PageTwo;
