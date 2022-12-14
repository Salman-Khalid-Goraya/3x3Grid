import React from "react";
import { target_images, non_target_images } from "../components/Image";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ThreegridPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [trialNumber, setTrialNumber] = useState(1);
  const [tragetIndex, setTargetIndex] = useState();
  const [selectedImagesArray, setSelectedImagesArray] = useState([]);
  const [attempts, setAttempts] = useState(1);
  const [jsonData, setJsonData] = useState([]);
  let i = 0;

  useEffect(() => {
    let indexForTarget = Math.floor(Math.random() * 17);
    let targetPhoto = target_images[indexForTarget];
    setTargetIndex(indexForTarget);
    setImages([]);
    for (let k = 0; k < 8; k++) {
      // let index = Math.floor(Math.random() * 22);
      // setImages((images) => [...images, non_target_images[index]]);
      setImages((images) => [...images, non_target_images[k]]);
    }
    setImages((images) => [...images, targetPhoto]);
  }, []);

  function handleClickImage(image) {
    if (image?.category === "non-target") {
      // console.log(selectedImagesArray);
      // if (!selectedImagesArray.includes(image?.index)) {
      setAttempts(attempts + 1);
      setSelectedImagesArray((selectedImagesArray) => [
        ...selectedImagesArray,
        image?.index,
      ]);
      // }
    } else if (image?.category === "target") {
      setAttempts(attempts + 1);
      setJsonData((jsonData) => [
        ...jsonData,
        { trial: trialNumber, attempts: attempts },
      ]);
      if (trialNumber === 3) {
        console.log("Trials are 3");
        console.log(jsonData);
        navigate(`/6x6grid/${jsonData}`);
      } else {
        setImages(shuffleArray(images));
        setAttempts(1);
        setTrialNumber(trialNumber + 1);
      }
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  return (
    <div className="container">
      <div className="headerText">Practice Trial 3x3 Grid</div>
      <div className="image-grid">
        {images.map((image, key) => {
          i = i + 1;
          if (i <= 9) {
            return (
              <div
                className="grid-item"
                key={key}
                onClick={() => handleClickImage(image)}
              >
                <img
                  src={image?.image}
                  width="120px"
                  height="120px"
                  alt={image?.index}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ThreegridPage;
