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
        <img
          id="imgcss"
          src="https://play-lh.googleusercontent.com/38AGKCqmbjZ9OuWx4YjssAz3Y0DTWbiM5HB0ove1pNBq_o9mtWfGszjZNxZdwt_vgHo=s200"
          alt=""
        />
        {sessionStorage.getItem("user") && (
          <ul>
            <li>
              <h5>회원정보</h5>
            </li>
            <li>아이디 : {JSON.parse(sessionStorage.getItem("user"))[0]}</li>
            <li>비밀번호 : {JSON.parse(sessionStorage.getItem("user"))[1]}</li>
            <li>이름 : {JSON.parse(sessionStorage.getItem("user"))[3]}</li>
            <li>전화번호 : {JSON.parse(sessionStorage.getItem("user"))[2]}</li>
            <li>닉네임 : {JSON.parse(sessionStorage.getItem("user"))[4]}</li>
          </ul>
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
          <h1>펫 등록</h1>
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
                <button type="submit" className="btn btn-primary btn2">
                  펫등록
                </button>
              </div>
            </div>
          </form>
          <input
            type="file"
            onChange={imgChange}
            accept="image/*"
            capture="camera"
            style={{ display: "block", margin: "0 auto", marginBottom: "20px" }}
          />
          <button
            onClick={uploadImg}
            style={{ display: "block", margin: "0 auto" }}
          >
            펫 사진 추가
          </button>
          {imageUrl && (
            <div>
              <h4>추가된 펫 사진</h4>
              <img src={imageUrl} alt="" style={{ maxWidth: "100%" }} />
            </div>
          )}
          <br />
          <Link to={"/mypet"} className="linkStyle">
            <button style={{display: "block", margin:"0 auto" }} >펫 리스트</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Mypage;
