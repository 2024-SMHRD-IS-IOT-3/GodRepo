import React, { useState } from "react";
import axios from "../axios";
import "./Mypage.css";

const Mypage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const imgChange = (e) => {
    setSelectedFile(e.target.files[0]);
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
        <h5 className="card-title" style={{ textAlign: "center" }}>
          마이펫
        </h5>
        <p className="card-text" style={{ textAlign: "center" }}>
          마이펫마이펫
        </p>
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
          이미지 업로드
        </button>
        {imageUrl && (
          <div>
            <h4>업로드된 이미지</h4>
            <img src={imageUrl} alt="" style={{ maxWidth: "100%" }} />
          </div>
        )}
        {/* 조건부 렌더링 */}
      </div>
    </div>
  );
};

export default Mypage;
