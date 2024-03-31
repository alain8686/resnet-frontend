"use client";
import React, { useEffect, useState } from 'react';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions} from '@capacitor-community/camera-preview'; 
import styled from 'styled-components';
import Image from 'next/image';
import handlerModel from './util/ia';
import jpeg from 'jpeg-js';
const save = require('save-file');



const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 20px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 123;

  &:hover {
    background-color: #45a049;
  } 
`;


const Container = styled.div`
  flex: 1;
`;
const ColLeft = styled.div`
  flex: 1;
`;
const ColRight = styled.div`
  flex: 1;
`;



const Picture: React.FC = () => {
  const [classeInference, setClasseInference] = useState(-1);
  const [probability, setProbability] = useState(0.0);
  const [classeDesc, setClasseDesc] = useState("");

  const [xMax, setXMax] = useState(672);
  const [xMin, setXMin] = useState(0);
  const [yMax, setYMax] = useState(672);
  const [yMin, setYMin] = useState(0);

  const [canvasRef, setCanvasRef] = useState("");
  const [isHuman, setIsHuman] = useState(false);

  const handleInitCameraButtonClick = () => {
    const options: CameraPreviewOptions = { 
      parent: 'cameraPreview', 
      width: 672, 
      height: 672, 
      position: 'rear', 
      className: 'previewer', 
      toBack: true
    }
    CameraPreview.start(options);
  };


  const handleTakePictureButtonClick = async () => {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
        quality: 85,
        height: 64,
        width: 64
    };
      
    CameraPreview.capture(cameraPreviewPictureOptions).then(async result => {
      const base64PictureData = result.value;
      setCanvasRef(`data:image/png;base64,${base64PictureData}`);

      //const bufferData = Buffer.from(base64PictureData, 'base64');
      const response1 = await fetch('val_144.JPEG');
      const blob = await response1.blob();
      const bufferData = Buffer.from(await blob.arrayBuffer());

      const rawImageData: jpeg.UintArrRet = jpeg.decode(new Uint8Array(bufferData), { useTArray: true });
      
      //const formData = new FormData();
      //formData.append('image', blobData, 'image.jpg');

      handlerModel(rawImageData).then((response) => {
        if(response && response.classe > -1){
          setIsHuman(true);
          const [xMin_, yMin_, xMax_, yMax_] = response.boxCoordinate;

          setXMin(xMin_ * 10.5);
          setYMin(yMin_ * 10.5);
          setXMax(xMax_ * 10.5);
          setYMax(yMax_ * 10.5);
          setClasseInference(response.classe);
          setClasseDesc(response.classeDesc);
          setProbability(response.probability);

          const url = 'https://worker-rust.alaindominguezfuentes.workers.dev'
          const formData = new FormData();
          const blobData = new Blob([bufferData], { type: 'image/jpeg' });
          formData.append('image', blobData, 'image.jpg');
          fetch(url, {method: 'PUT', body: formData, headers: {}}).then(_ => console.log('Imagem enviado')).catch(e => {
            console.log(e);
          });
          save(blobData, 'imagen.jpeg');
        }
        else if(response){
          setIsHuman(true);
          const [xMin_, yMin_, xMax_, yMax_] = response.boxCoordinate;
          setXMin(xMin_ * 10.5);
          setYMin(yMin_ * 10.5);
          setXMax(xMax_ * 10.5);
          setYMax(yMax_ * 10.5);
          setClasseInference(response.classe);
          setClasseDesc(response.classeDesc);
          setProbability(response.probability);
        }
    
      });
    });
  };

  useEffect(() => {
    handleInitCameraButtonClick();
    const timer = setInterval(handleTakePictureButtonClick, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <div style={{position: "relative"}}>
        <label>Classe do objeto: {classeInference}</label> &nbsp; &nbsp;
        <label>Probabilidade: {probability.toFixed(3)}</label> &nbsp; &nbsp;
        <label>Descrição: {classeDesc}</label>
      </div>
      <div style={{position: "relative"}}>
        { canvasRef != "" &&
          <div>
            <div
              style={{
                backgroundImage: `url('${canvasRef}')`,
                width: "672px",
                height: "672px",
                backgroundSize: "cover"
              }}
            />
            </div>
        }
        { canvasRef != "" && isHuman &&
            <div
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    top: `${yMin}px`,
                    left: `${xMin}px`,
                    /*transform: 'translate(-50%, -50%)',*/
                    width: `${yMax - yMin}px`,
                    height: `${xMax- xMin}px`,
                    border: '2px solid red',
                    boxSizing: 'border-box'
                  }}
                />
            }

          <div id="cameraPreview" hidden style={{position: 'absolute', width:'672px', height: '672px'}}>  
          </div>
      </div>
    </React.Fragment>

  );
};

export default  Picture;
