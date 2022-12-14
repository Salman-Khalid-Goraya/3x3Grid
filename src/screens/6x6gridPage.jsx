import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { target_images, non_target_images } from "../components/Image";

const SixgridPage = () => {
  const { jsonData } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [trialNumber, setTrialNumber] = useState(1);
  const [tragetIndex, setTargetIndex] = useState();
  const [selectedImagesArray, setSelectedImagesArray] = useState([]);
  const [attempts, setAttempts] = useState(1);
  const [jsonData1, setJsonData] = useState([]);
  let i = 0;

  useEffect(() => {
    let indexForTarget = Math.floor(Math.random() * 17);
    let targetPhoto = target_images[indexForTarget];
    setTargetIndex(indexForTarget);
    setImages([]);
    for (let k = 0; k < 35; k++) {
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
      console.log("Trial is", trialNumber);
      setAttempts(attempts + 1);
      setJsonData((jsonData1) => [
        ...jsonData1,
        { trial: trialNumber, attempts: attempts },
      ]);
      if (trialNumber === 10) {
        console.log("Trials are 10");
        console.log(jsonData1);
        navigate(`/thanks/${jsonData1}`);
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
      <div className="headerText">Practice Trial 6x6 Grid</div>
      <div className="image-grid-six">
        {images.map((image, key) => {
          // i = i + 1;
          // if (i <= 9) {
          return (
            <div
              className="grid-item"
              key={key}
              onClick={() => handleClickImage(image)}
            >
              <img
                src={image?.image}
                width="60px"
                height="60px"
                alt={image?.index}
              />
            </div>
          );
          // }
        })}
      </div>
    </div>
  );
};

export default SixgridPage;
