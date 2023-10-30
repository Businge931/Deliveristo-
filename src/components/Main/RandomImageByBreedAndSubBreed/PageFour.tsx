import React, { useState, useEffect, useCallback } from "react";
import useFetch from "../../../utils/hooks/useFetch";
import CustomSelect from "../../CustomSelectField/CustonSelectField";
import styles from "./PageFour.module.css";
import Loader from "../../Loader/Loader";
import Error from "../../Error/Error";

interface PageFourProps {
  content: React.ReactNode;
}

const PageFour: React.FC<PageFourProps> = ({ content }) => {
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [selectedSubBreeds, setSelectedSubBreeds] = useState<string[]>([]);
  const [randomBreedImage, setRandomBreedImage] = useState<string>("");
  const [subBreedImages, setSubBreedImages] = useState<{
    [key: string]: string[];
  }>({});

  const {
    data: breedsData,
    isLoading: breedsLoading,
    error: breedsError,
    fetchData: fetchBreeds,
  } = useFetch("https://dog.ceo/api/breeds/list/all");

  const { data: randomBreedImageData, fetchData: fetchRandomBreedImage } =
    useFetch(
      selectedBreed
        ? `https://dog.ceo/api/breed/${selectedBreed}/images/random`
        : ""
    );

  const {
    data: subBreedsData,
    isLoading: subBreedsLoading,
    error: subBreedsError,
    fetchData: fetchSubBreeds,
  } = useFetch(
    selectedBreed ? `https://dog.ceo/api/breed/${selectedBreed}/list` : ""
  );

  const fetchSubBreedImages = useCallback(
    async (breed: string, subBreed: string) => {
      const res = await fetch(
        `https://dog.ceo/api/breed/${breed}/${subBreed}/images`
      );
      const data = await res.json();
      setSubBreedImages((prevImages) => ({
        ...prevImages,
        [subBreed]: data.message,
      }));
    },
    []
  );

  const handleBreedChange = (selectedBreed: string) => {
    setSelectedBreed(selectedBreed);
    fetchRandomBreedImage();
    fetchSubBreeds();
  };

  useEffect(() => {
    fetchBreeds();
  }, [fetchBreeds]);

  useEffect(() => {
    if (randomBreedImageData) {
      setRandomBreedImage(randomBreedImageData.message as string);
    }
  }, [randomBreedImageData]);

  useEffect(() => {
    if (subBreedsData) {
      setSelectedSubBreeds(subBreedsData.message as string[]);
      if (subBreedsData.message.length > 0) {
        (subBreedsData.message as string[]).forEach((subBreed: string) => {
          fetchSubBreedImages(selectedBreed, subBreed);
        });
      }
    }
  }, [subBreedsData, selectedBreed, fetchSubBreedImages]);

  return (
    <div>
      <h1 className="heading">{content}</h1>
      <div className={styles["select-breed"]}>
        <label>Select Breed:</label>
        {breedsLoading ? (
          <Loader />
        ) : breedsError ? (
          <Error error="Error loading breeds" />
        ) : (
          <CustomSelect
            defaultText="Select a breed"
            optionsList={
              breedsData?.message
                ? Object.entries(breedsData.message)
                    .filter(
                      ([breed, subBreeds]) =>
                        Array.isArray(subBreeds) && subBreeds.length > 0
                    )
                    .map(([breed], index) => ({
                      id: index,
                      name: breed,
                    }))
                : []
            }
            onSelect={handleBreedChange}
          />
        )}
        {selectedBreed && (
          <h2>
            Image of: <span>{selectedBreed}</span>
          </h2>
        )}
      </div>
      {selectedBreed && (
        <div className={styles.images}>
          <div className={styles["image-container"]}>
            <img src={randomBreedImage} alt={selectedBreed} />
          </div>
          {selectedSubBreeds.length > 0 && (
            <div>
              <h2 className={styles["sub-breed-heading"]}>Sub-Breed Images</h2>

              {subBreedsLoading ? (
                <Loader />
              ) : subBreedsError ? (
                <Error error="Error loading sub-breeds" />
              ) : (
                selectedSubBreeds.map((subBreed) => {
                  const images = subBreedImages[subBreed] || [];
                  return (
                    <div className={styles["sub-breeds"]} key={subBreed}>
                      <h3 className={styles["sub-breed-name"]}>{subBreed}</h3>
                      <div className={styles["sub-breed-images"]}>
                        {Array.isArray(images) &&
                          images.map((image, index) => (
                            <div
                              className={styles["sub-breed-image"]}
                              key={index}
                            >
                              <img src={image} alt={subBreed} />
                            </div>
                          ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PageFour;
