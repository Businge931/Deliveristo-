import React, { useState } from "react";
import styles from "./App.module.css";
import PageOne from "./components/Main/RandomImageByBreed/PageOne";
import PageTwo from "./components/Main/ImagesListByBreed/PageTwo";
import PageThree from "./components/Main/RandomImageByBreedAndSubBreed/PageFour";
import PageFour from "./components/Main/ImagesListByBreedAndSubBreed/PageThree";

const sidebarButtonContent = [
  "Random image by breed",
  "Images list by breed",
  "Random image by breed and sub breed",
  "Images list by breed and sub breed",
];

const App: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <main className={styles.main}>
      <aside className={`${styles.sidebar} sidebar`}>
        <div className={styles["avatar-box"]} />

        <ul className={styles.sidebar_list}>
          {sidebarButtonContent.map((btnContent, index) => (
            <li
              key={btnContent}
              id={`list_content_${index}`}
              className={
                index === selectedIndex
                  ? `${styles.active}`
                  : `${styles.sidebar_list_item}`
              }
              onClick={() => handleItemClick(index)}
            >
              {btnContent}
            </li>
          ))}
        </ul>
      </aside>
      <div className={`${styles.layout} layout`}>
        {selectedIndex === 0 && <PageOne content={sidebarButtonContent[0]} />}
        {selectedIndex === 1 && <PageTwo content={sidebarButtonContent[1]} />}
        {selectedIndex === 2 && <PageFour content={sidebarButtonContent[2]} />}
        {selectedIndex === 3 && <PageThree content={sidebarButtonContent[3]} />}
      </div>
    </main>
  );
};

export default App;
