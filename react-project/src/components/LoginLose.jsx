import React, { useState } from "react";
import "./LoseStyle.css";
import axios from "../axios";
const LoginLose = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const handleid = (e) => {
    e.preventDefault();
    console.log("아이디찾기!name,phone", name, phone);

    axios
      .post("/idtry", {
        name: name,
        phone: phone,
      })
      .then((res) => {
        if (res.data != 0) {
          console.log(res.data);
          alert(`회원님의 아이디는 : ${res.data} 입니다. `);

          // 로그인 시, 세션에 객체를 저장
          sessionStorage.setItem("user", JSON.stringify(res.data));
          window.location.href = "/login";
        } else {
          alert("정보가 없습니다 ㅋㅋ");
          window.location.href = "/loginlose";
        }
      });
  };
  const handlepw = (e) => {
    e.preventDefault();
    console.log("비밀번호찾기!id,name,phone", id, name, phone);

    axios
      .post("/pwtry", {
        id: id,
        name: name,
        phone: phone,
      })
      .then((res) => {
        if (res.data != 0) {
          console.log(res.data);
          alert(`회원님의 비밀번호는 : ${res.data} 입니다. `);

          // 로그인 시, 세션에 객체를 저장
          sessionStorage.setItem("user", JSON.stringify(res.data));
          window.location.href = "/login";
        } else {
          alert("정보가 없습니다 ㅎㅎ");
          window.location.href = "/loginlose";
        }
      });
  };

  return (
    <div className="lose_container-wrapper">
      <div className="lose_container">
        <h1>아이디찾기</h1>
        <hr />
        <img
          id="imgcss"
          src="https://ideogram.ai/api/images/direct/ZUOT0aqhSUyEz-8_5RzBxw.png"
        />
        <form onSubmit={handleid}>
          <div className="lose_formBox">
            <div className="mb-3 loginbox2">
              <label htmlFor="formGroupExampleInput" className="form-label">
                이름
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 loginbox2">
              <label htmlFor="formGroupExampleInput2" className="form-label ">
                전화번호
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Enter Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3 loginbox2">
              <button type="submit" className="btn btn-primary btn2">
                아이디찾기
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="lose_container">
        <h1>비밀번호찾기</h1>
        <hr />
        <img
          id="imgcss"
          src="https://ideogram.ai/api/images/direct/whHdQyIvTYyOfCB0YNn4EA.png"
        />
        <form onSubmit={handlepw}>
          <div className="formBox">
            <div className="mb-3 loginbox2">
              <label htmlFor="formGroupExampleInput" className="form-label">
                아이디
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Enter ID"
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="mb-3 loginbox2">
              <label htmlFor="formGroupExampleInput2" className="form-label ">
                이름
              </label>
              <input
                type="password"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 loginbox2">
              <label htmlFor="formGroupExampleInput2" className="form-label ">
                전화번호
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Enter Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3 loginbox2">
              <button type="submit" className="btn btn-primary btn2">
                비밀번호찾기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginLose;
