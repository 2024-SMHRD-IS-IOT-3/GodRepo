import axios from '../axios'
import React, { useState } from 'react'

const Createboard = () => {
  const dogsesssion = JSON.parse(sessionStorage.getItem("user"));
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  

  const createBoard=(e)=>{
    e.preventDefault()
    console.log("버튼 클릭했다",title,content,imageUrl)
    axios.post("/createboard",{
      title : title,
      content : content,
      imgs : imageUrl,
      user : dogsesssion[0]
    })

    window.location.href = "/board";
  }
    // 이미지 불러오기

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
      console.log(imageUrl)
      console.log("이미지 업로드 완료:", response.data);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  return (
    <div>
      <h1>게시글 작성하기</h1>
      <hr></hr>
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">게시물 제목</label>
          <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" onChange={(e)=> setTitle(e.target.value)}/>
        </div>
        {/* 게시글 내용 */}
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
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">게시글 내용</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e)=> setContent(e.target.value)}></textarea>
        </div>
        {/* <div class="mb-3">
        <label for="formFileMultiple" class="form-label">이미지 파일 선택</label>
        <input class="form-control" type="file" id="formFileMultiple" multiple onChange={(e)=> setImgs(e.target.value)}/>
        </div> */}

        {/* 뛰발 이거 안되기만 해 진짜로 죽인다 ;;  */}
        
        <div className='mb-3 loginbox2'>
          <button type="submit" className="btn btn-primary btn2" onClick={createBoard}>작성</button>
        </div>


    </div>
  )
}

export default Createboard