import React, { useEffect, useState } from "react";
import styles from "./PageTwo.module.css";
import CustomSelect from "../../CustomSelectField/CustonSelectField";
import useFetch from "./../../../utils/hooks/useFetch";

interface PageTwoProps {
  content: React.ReactNode;
}

const PageTwo: React.FC<PageTwoProps> = ({ content }) => {
  const [selectedBreed, setSelectedBreed] = useState<string>("");

  // Create a useFetch instance for fetching breed images
  const breedImagesFetch = useFetch(
    selectedBreed ? `https://dog.ceo/api/breed/${selectedBreed}/images` : ""
  );

  // Create a useFetch instance for fetching all breeds
  const allBreedsFetch = useFetch("https://dog.ceo/api/breeds/list/all");

  const handleBreedChange = (selectedBreed: string) => {
    setSelectedBreed(selectedBreed);
    breedImagesFetch.fetchData(); // Trigger the image fetch
  };

  useEffect(() => {
    allBreedsFetch.fetchData(); // Trigger the fetch for all breeds
  }, [allBreedsFetch]);

  return (
    <div>
      <h1 className="heading">{content}</h1>

      <div className={styles.pageTwo}>
        <CustomSelect
          defaultText="Select a breed"
          optionsList={
            allBreedsFetch.isLoading
              ? []
              : Object.keys(allBreedsFetch.data?.message || {}).map(
                  (breed, index) => ({
                    id: index,
                    name: breed,
                  })
                )
          }
          onSelect={handleBreedChange}
        />

        <ul className={styles["dog-list"]}>
          {breedImagesFetch.isLoading ? (
            <p>Loading images...</p>
          ) : breedImagesFetch.error ? (
            <p>Error: {breedImagesFetch.error}</p>
          ) : (
            Array.isArray(breedImagesFetch.data?.message) &&
            breedImagesFetch.data?.message.map((img: string, index: number) => (
              <li key={index}>
                <img
                  onLoad={() => {
                    // Image loaded, remove the loading text
                    const loadingText = document.getElementById(
                      `loading_${index}`
                    );
                    if (loadingText) {
                      loadingText.style.display = "none";
                    }
                  }}
                  src={img}
                  alt="dog breed"
                />
                <p
                  id={`loading_${index}`}
                  style={{ color: "white", textAlign: "center" }}
                >
                  Loading...
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default PageTwo;
