import React, { useState } from 'react'
import './LoginStyles.css'
import axios from '../axios';
import { Link } from 'react-router-dom';

const Login = () => {

  const [id,setId] = useState('');
  const [pw,setPw] = useState('');

  const handleLogin = (e) => {
    e.preventDefault()
    console.log("로그인 버튼 클릭!id,pw",id,pw)

    axios.post("/logintry",{
        id : id,
        pw : pw
    }).then((res)=> {
      if (res.data != 0) {
          console.log(res.data)
          alert(`${res.data}님 로그인 ★성 공★ `)

          // 로그인 시, 세션에 객체를 저장
          sessionStorage.setItem("user",JSON.stringify(res.data))
          window.location.href = "/"
      }else {
          alert("로그인 실패 ㅋㅋ")
          window.location.href = "/login"
      }
  })
}
  return (
    <div className='container'>
      <h1>로그인</h1>
      <img id='imgcss' src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA2MDNfMjg3%2FMDAxNjg1Nzc0MDcwMDgz.zfaKm4c5lDDiy_r5JYLKvCA9EefCDwX85vFtBahiJfMg.lsBi5DXhjuGcJGOyxei2XwES2Se4GNp-3RhWJpnp1-4g.JPEG.2daenggu%2F311619686_170623702227257_1514842534332662795_n.jpg&type=a340'/>
      <form onSubmit={handleLogin}>
        <div className='formBox'>
          <div className="mb-3 loginbox2">
            <label htmlFor="formGroupExampleInput" className="form-label">ID</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter ID" onChange={(e)=> setId(e.target.value)}/>
          </div>
          <div className="mb-3 loginbox2">
            <label htmlFor="formGroupExampleInput2" className="form-label ">PW</label>
            <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Enter PW" onChange={(e)=> setPw(e.target.value)}/>
          </div>
          <div className='mb-3 loginbox2'>
            <button type="submit" className="btn btn-primary btn2">로그인</button>
          </div>
          <p><Link to={'/loginlose'}>아이디 혹은 비밀번호를 잃어버리셨나요?</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Login