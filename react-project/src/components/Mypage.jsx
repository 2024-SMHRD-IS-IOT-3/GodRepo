import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import "./Mypage.css";



const Mypage = () => {
  const [petName, setPetName] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [petBreed, setPetBreed] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  


  const addPet = (e) => {
    e.preventDefault();

    console.log("펫정보 등록")
    
    axios.post("/petinfo", {
      
      petName : petName,
      petWeight : petWeight,
      userid : JSON.parse(sessionStorage.getItem("user"))[0],
      petBreed : petBreed,
      imgs : imageUrl
    })
    
  }

  const imgChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const uploadImg = async () => {
    if (!selectedFile) {
      alert("이미지를 선택해 주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("img", selectedFile);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImageUrl(response.data.imagePath);
      console.log("이미지 업로드 완료:", response.data);
      sessionStorage.setItem("pet", JSON.stringify(response.data));
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  return (
    <div className="background">
      <h1 id="mypage">마이페이지</h1>
      <hr />
    <div className="Myitems">
  
      <div
        className="card"
        style={{
          width: "40rem",
          margin: "auto",
          marginTop: "20px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        
        {sessionStorage.getItem("user") && (
          <div>
            
          <ul>
            <li>
              <h5>회원정보</h5>
              <hr />
              <img
          id="imgcss"
          src="https://cdn-icons-png.flaticon.com/512/159/159833.png"
          alt=""
        />
              <hr />
            </li>
            {/* <li>아이디 : {JSON.parse(sessionStorage.getItem("user"))[0]}</li>
            <li>비밀번호 : {JSON.parse(sessionStorage.getItem("user"))[1]}</li>
            <li>이름 : {JSON.parse(sessionStorage.getItem("user"))[3]}</li>
            <li>전화번호 : {JSON.parse(sessionStorage.getItem("user"))[2]}</li>
            <li>닉네임 : {JSON.parse(sessionStorage.getItem("user"))[4]}</li> */}
            <p className="userinfo">아이디 : {JSON.parse(sessionStorage.getItem("user"))[0]} </p>
            <p className="userinfo">비밀번호 : {JSON.parse(sessionStorage.getItem("user"))[1]} </p>
            <p className="userinfo">이름 : {JSON.parse(sessionStorage.getItem("user"))[3]}</p>
            <p className="userinfo">전화번호 : {JSON.parse(sessionStorage.getItem("user"))[2]}</p>
            <p className="userinfo">닉네임 : {JSON.parse(sessionStorage.getItem("user"))[4]}</p>
          </ul>
          </div>
        )}
      </div>
      <div
        className="card"
        style={{
          width: "40em",
          margin: "auto",
          marginTop: "20px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <div className="container">
          <ul>
            <li>
              <h5>펫 등록</h5>
            </li>
          </ul>
          
          <hr />
          <form onSubmit={addPet}>
            <div className="formbox">
              <div className="mb-3 loginbox2">
                <label
                  htmlFor="formGroupExampleInput1"
                  className="form-label doglabel"
                >
                  펫이름
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput1"
                  placeholder="이름입력"
                  onChange={(e)=>{setPetName(e.target.value)}}
                />
              </div>
              <div className="mb-3 loginbox2">
                <label
                  htmlFor="formGroupExampleInput4"
                  className="form-label doglabel"
                >
                  체중
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput4"
                  placeholder="체중입력"
                  onChange={(e)=>{setPetWeight(e.target.value)}}
                />
              </div>
              <div className="mb-3 loginbox2">
                <label
                  htmlFor="formGroupExampleInput5"
                  className="form-label doglabel"
                >
                  견종
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput5"
                  placeholder="견종입력"
                  onChange={(e)=>{setPetBreed(e.target.value)}}
                />
              </div>
              <div className="mb-3 loginbox2">
                <button type="submit" className="w-btn-outline w-btn-gray-outline">
                  펫등록
                </button>
              </div>
            </div>
          </form>
          
          <input
            type="file"
            className="inputfile"
            onChange={imgChange}
            accept="image/*"
            capture="camera"
            
          />
          <button
            onClick={uploadImg}
            className="w-btn-outline w-btn-gray-outline"
            style={{ display: "block", margin: "0 auto" }
            
          }
          >
            펫 사진 업로드
          </button>

          {imageUrl && (
            <div className="image-up">
               
              <img src={imageUrl} alt="" style={{ maxWidth: "100%" }} />
            </div>
          )}
          <br />
          <Link to={"/mypet"} className="linkStyle">
            <button className="w-btn-outline w-btn-gray-outline" type="button" style={{display: "block", margin:"0 auto" }} >펫 리스트</button>
          </Link>
          
        </div>
      </div>
    </div>
    </div>
  );
};

export default Mypage;
