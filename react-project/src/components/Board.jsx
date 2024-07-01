import React, { useEffect, useState } from 'react'
import './BoardStyles.css'
import { Link } from 'react-router-dom'
import axios from '../axios'
import Pagination from 'react-js-pagination'

const Board = () => {
  const dogsesssion = JSON.parse(sessionStorage.getItem("user"));
  // 게시판 구현 관련 변수
  const MAX_LENGTH = 30;
  const [board,setBorad] = useState({
    title : [],
    content : [],
    content2 : [],
    user : [],
    bIdx : [],
    filename : []
  })

  // 페이지네이션 구현 관련 변수
  const [page, setPage] = useState(1);
  const [currentPost,setcurrentPost] = useState(board.title)
  const postPerPage = 6
  const indexOfLastPost = page * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage

  useEffect(()=>{
    axios.post("/boardloading",{
      message : 'boardloading'
    }).then((res)=> {
      console.log("react:",res)
      setBorad(...[{
        title : res.data.title.reverse(),
        content : res.data.content.reverse(),
        content2 : res.data.content2.reverse(),
        user : res.data.user.reverse(),
        bIdx : res.data.bIdx.reverse(),
        filename : res.data.filename.reverse()
      }])
    })
  },[])

  // 페이지네이션 구현 
  useEffect(()=>{
    setcurrentPost(board.title.slice(indexOfFirstPost,indexOfLastPost))
  },[board,page])

  const handlePageChange = (page) => { setPage(page); }
  console.log(dogsesssion)
  return (
    <div className='BoardContainer'>

{/* 게시물 부분 */}
    <h1>커뮤니티</h1>
      <hr />
      {dogsesssion != null ?
      <ul id='navbar' className='justify-content-end'>
            <li>
              <Link  to={'/createboard'}>글작성</Link>
            </li>
      </ul>
      :
      <ul id='navbar' className='justify-content-end'>
            <li>
              <Link  to={'/login'}>글쓰고 싶어? 로그인해 </Link>
            </li>
      </ul>}
      <div className="row row-cols-1 row-cols-md-3 g-4 Boards">
        {currentPost.map((boardIdxItem, index) => (
          <div key={index} className="col boardss">
            <div className="card text-center">
              <Link to={`/boardDetail/${page == 1 ?board.bIdx[index] :board.bIdx[index+((page-1)*5+1)]}`}>
                {/* 이미지는 퍼블릭폴더에 이미지 파일을 따로 만들어서 불러오는 형식으로 제작할것 */}
              {/* {board.filename == '/img/1716188561841.jpg' ? <img src={board.filename} className="card-img-top" alt="이미지" /> : <img src='/dogcomu.png' className="card-img-top" alt="이미지" />} */}
              {/* <img src='/dogcomu.png' className="card-img-top" alt="이미지" /> */}
              <img src={board.filename[index]} className="card-img-top" alt="이미지" />
              <div className="card-body">
                <h5 className="card-title">{boardIdxItem}</h5>
                <p className="card-text">{board.content[index].length > MAX_LENGTH ? board.content[index].slice(0, MAX_LENGTH) + '...' : board.content[index]}</p>
              </div>
              </Link>
            </div>
          </div>
        ))}


{/* 버튼 부분 */}
    {/* <nav aria-label="Page navigation example"> */}
      <Pagination 
        // 현제 보고있는 페이지 page
          activePage={page} 
        // 한페이지에 출력할 아이템수 items
          itemsCountPerPage={postPerPage}
        // 총 아이템수 데이터 갯수
          totalItemsCount={board.title.length} 
        // 표시할 페이지수
          pageRangeDisplayed={5}
        // 함수
          onChange={handlePageChange}
        // ul 클래스
          innerClass = "pagination justify-content-center ulcenter"
        // li 클래스
          activeClass = "page-item disabled"
        // a 클래스
          activeLinkClass = "page-link"
        // 다음 페이지 
          nextPageText = "다음"
        // 이전 페이지
          prevPageText = "이전"
        // 처음으로
          firstPageText = ""
        // 마지막으로
          lastPageText = ""

          >
        </Pagination>
    {/* </nav> */}
      </div>
    </div>

  )
}

export default Board