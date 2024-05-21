import React, { useEffect, useState } from "react";
import axios from "../axios";
const Mypet = () => {
  const [petname, setName] = useState([]);
  const [weight, setWeight] = useState([]);
  const [petday, setPetday] = useState([]);
  const [breed, setBreed] = useState([]);
  const [img, setImg] = useState([]);

  const handleOut = () => {
    sessionStorage.removeItem("pet");
    window.location.href = "/"; // 로그아웃 후 페이지 새로고침
  };
  const dogsesssion = JSON.parse(sessionStorage.getItem("user"));
// petName, petWeight, userid, petBreed
//함수로하기
useEffect(()=>{
    console.log("조회 버튼 눌렀을떄")
    axios.post("/mydog", {
        user : dogsesssion[0]
        })
        .then((res) => {
            console.log(res)
        if (res.data.length !== 0) {
            setName(res.data.petName);
            setWeight(res.data.petW);
            setPetday(res.data.time);
            setBreed(res.data.breed);
            setImg(res.data.img)
        }
        });
},[])
    

console.log(petname)


  return (
    <div>
      {petname.map((nameitem, index) => (
        <div
          className="card"
          style={{
            width: "auto",
            margin: "auto",
            marginTop: "20px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <ul>
            <li>
              <h5>마이펫 정보</h5>
            </li>
            <img
              src={img[index]}
              alt=""
              style={{ maxWidth: "100%" }}
            />
            <li>펫 이름 : {nameitem}</li>
            <li>펫 체중 :{weight[index]} </li>
            <li>견종 : {breed}</li>
            <li>펫 등록일자 :{petday[index]} </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Mypet;