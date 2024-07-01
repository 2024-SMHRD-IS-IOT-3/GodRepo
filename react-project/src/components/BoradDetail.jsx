import axios from '../axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BoradDetail = () => {
  const dogsesssion = JSON.parse(sessionStorage.getItem("user"));
  const bIdx = useParams().board_idx;
  const [board,setBorad] = useState({
    idx : '',
    img : '',
    likes : '',
    time : '',
    title : '',
    user : '',
    views : '',
    content : ''
  })
  const [comment,setcomment] = useState({
    user2 : [],
    comment : [],
    time : []
  })

  useEffect(()=>{
    axios.get("/boardread",{
      params : {bIdx : bIdx}
    }).then((res)=>{
      console.log("res",res)
      if (res.data.content2 == null) {
        res.data.content2 = ""
      }
      setBorad({
        idx : res.data.idx,
        img : res.data.img,
        likes : res.data.likes,
        time : res.data.time,
        title : res.data.title,
        user : res.data.user,
        views : res.data.views,
        content : res.data.content + res.data.content2
      })
      if (res.data.comments) {
        setcomment({
          user2 : res.data.comments.user2,
          comment : res.data.comments.comment,
          time : res.data.comments.comment_time
        })
      }
    })
  },[])

  // 댓글 입력 부분
  const [inputComment,setinputComment] = useState('')
  const commentInput = (e) =>{
    e.preventDefault()
    if (dogsesssion != null) {
      console.log("댓글달기 버튼 눌렀네 내용꼬라지 한번 볼까?",inputComment)
      axios.get("/commentcreate",{params : {text : inputComment, bIdx : bIdx , user : dogsesssion[0]}})
      window.location.href = window.location.href;
    }else {
      alert("로그인이 필요한 서비스입니다.")
      window.location.href = window.location.href;
    }
  }
  return (
    <div>
        {/* 게시판 상세페이지 */}
        <h1>{board.title}</h1>
        <p>{board.user}</p>
        <hr />
        <img src={board.img} className="card-img-top" alt="이미지" />
        <p>{board.content}</p>
        <hr />
        {/* 댓글 입력 관련 */}

        <h5>댓글 입력</h5>
        <form onSubmit={commentInput}>
          <input type='textarea' onChange={(e)=>setinputComment(e.target.value)}></input>
          <button type='submit'>댓글 입력버튼인데 진짜 졸라하기 싫다 진짜로</button>
        </form>

        <hr />
        {/* 댓글 보여주는 부분 */}
        {comment.user2.map((commentItem,index)=>(
          <div key={index}>
            <p>{commentItem}</p>
            <p>{comment.comment[index]}</p>
            <p>{comment.time[index]}</p>
            <hr />
          </div> 
        ))
        }
    </div>
  )
}

export default BoradDetail