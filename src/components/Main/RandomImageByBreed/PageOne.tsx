import React, { useEffect, useState } from "react";
import styles from "./PageOne.module.css";
import chevronLeft from "../../../assets/chevron-left.svg";
import chevronRight from "../../../assets/chevron-right.svg";
import UseFetch from "../../../utils/hooks/useFetch";
import Error from "../../Error/Error";
import Loader from "../../Loader/Loader";

interface PageOneProps {
  content: React.ReactNode;
}

const PageOne: React.FC<PageOneProps> = ({ content }) => {
  const { data, fetchData, isLoading, error } = UseFetch(
    "https://dog.ceo/api/breeds/image/random"
  );
  const [breed, setBreed] = useState<string | undefined>("");
  const [breedName, setBreedName] = useState<string>("");

  useEffect(() => {
    if (data && data.message) {
      if (typeof data.message === "string") {
        // If it's a string, it's a valid URL
        const parts = data.message.split("/");
        const breedIndex = parts.indexOf("breeds");
        const breedName = parts[breedIndex + 1];
        console.log("Breed Name:", breedName);
        setBreedName(breedName);
        setBreed(data.message);
      } else if (Array.isArray(data.message)) {
        // If it's an array, you can handle it as needed
        // For now, just pick the first element (you can adjust as needed)
        setBreed(data.message[0]);
      } else if (typeof data.message === "object") {
        setBreed(JSON.stringify(data.message));
      }
    }
  }, [data]);

  return (
    <div className="pageOne">
      <h1 className="heading">{content}</h1>
      {!error && (
        <h4 className={styles.breedName}>
          Breed Name:<span data-testid="bread_name">{breedName}</span>
        </h4>
      )}
      <div className={`${styles.pageOne} `}>
        <button onClick={fetchData}>
          <img src={chevronLeft} alt="prev icon" />
        </button>
        {isLoading ? (
          <div className={styles.image_container}>
            <Loader />
          </div>
        ) : error ? (
          <div className={styles.image_container}>
            <Error error={error} />
          </div>
        ) : (
          <figure className={styles.image_container}>
            {typeof breed === "string" && (
              <img
                className="dog-image"
                src={breed}
                alt="Random dog by breed"
              />
            )}
          </figure>
        )}
        <button onClick={fetchData}>
          <img src={chevronRight} alt="next icon" />
        </button>
      </div>
    </div>
  );
};

export default PageOne;
