import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Mypet.css";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const Mypet = () => {
  const [petname, setName] = useState([]);
  const [img, setImg] = useState([]);
  const [current, setCurrent] = useState(0);
  const [weight, setWeight] = useState([]);
  const [petday, setPetday] = useState([]);
  const [breed, setBreed] = useState([]);

  const handleOut = () => {
    sessionStorage.removeItem("pet");
    window.location.href = "/"; // 로그아웃 후 페이지 새로고침
  };

  const dogsesssion = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    axios.post("/mydog", {
      user: dogsesssion[0]
    })
    .then((res) => {
      if (res.data.length !== 0) {
        setName(res.data.petName);
        setImg(res.data.img);
        setWeight(res.data.petW);
        setPetday(res.data.time);
        setBreed(res.data.breed);
      }
    });
  }, []);

  const nextImg = () => {
    setCurrent((current + 1) % img.length);
  };

  const prevImg = () => {
    setCurrent((current - 1 + img.length) % img.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImg();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  if (!Array.isArray(img) || img.length <= 0) {
    return null;
  }

  return (
    <div className="petbox">
      <h1>마이펫 정보</h1>
      <hr />
      <div className="imageSlider">
        <IoIosArrowBack className="imageSlider-arrow left" size='30' onClick={prevImg}/>
        <img src={img[current]} alt="Pet" className="image" />
        
        <IoIosArrowForward className="imageSlider-arrow right" size='30' onClick={nextImg}/>
      </div>
      <hr />
      <div>
      {petname.map((nameitem, index) => (
        <div>
          <ul>
            <li>펫 이름 : {nameitem}</li>
            <li>펫 체중 :{weight[index]} kg </li>
            <li>견종 : {breed[index]}</li>
            <li>펫 등록일자 :{petday[index]} </li>
            <hr />
          </ul>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Mypet;


{/* <ul>
           
           <img
             src={img[index]}
             alt=""
             style={{ maxWidth: "100%" }}
           />
           <li>펫 이름 : {nameitem}</li>
           <li>펫 체중 :{weight[index]} </li>
           <li>견종 : {breed[index]}</li>
           <li>펫 등록일자 :{petday[index]} </li>
         </ul> */}