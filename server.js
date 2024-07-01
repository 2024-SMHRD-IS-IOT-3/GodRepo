const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const conn = require("./DB/db");
const path = require("path");
const multer = require("multer");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "react-project", "build")));
// app.use(express.static(__dirname));

app.get("/", (req, res) => {
  console.log(__dirname);
  app.use("index");
});



// 펫 정보 등록
app.post("/petinfo", async(req,res)=>{
  console.log("펫정보 등록 시도")
  console.log(req.body);
  
  let {petName, petWeight, userid, petBreed,imgs} = req.body;
  let sql = `insert into pet_infoss values(pet_infoss_SEQ.NEXTVAL, '${petName}', ${petWeight}, '${userid}', sysdate, '${petBreed}','${imgs}')`;
  
  
  try {
    const connection = await conn();
    const result = await connection.execute(sql, [], { autoCommit: true });
    ;
    console.log("펫정보 등록 성공:", result);
    res.status(200).send({ message: "펫정보가 성공적으로 등록되었습니다." });
  } catch (error) {
    console.error("펫정보 등록 실패:", error);
    res.status(500).send({ message: "펫정보 등록에 실패했습니다." });
  }
})


// 펫 정보 가져오기

app.post("/mydog", async (req, res) => {
  // console.log("마이펫조회 시도");
  let data = req.body.user
  // console.log(data)
  let sql = `select * from pet_infoss where user_id = '${data}' order by pet_idx`;
  
  // 여기서 데이터베이스 작업을 수행합니다.
  try {
    const connection = await conn();
    // 이제 connection 객체를 사용하여 데이터베이스 작업을 수행할 수 있습니다.

    // 예: 간단한 쿼리 실행
    const result = await connection.execute(sql);
    // console.log("result:",result.rows);
    let petList ={
      pidx : [],
      petName : [],
      petW : [],
      user : [],
      time : [],
      breed : [],
      img : []
    }
    // console.log("index : ",result.rows.length)
    for (let i=0; i<result.rows.length;i++) {
      petList.pidx.push(result.rows[i][0]),
      petList.petName.push(result.rows[i][1]),
      petList.petW.push(result.rows[i][2]),
      petList.user.push(result.rows[i][3]),
      petList.time.push(result.rows[i][4]),
      petList.breed.push(result.rows[i][5])
      petList.img.push(result.rows[i][6])
    }
    res.json(petList)
    // 연결 해제
    await connection.close();
  } catch (error) {
    console.error("데이터베이스 작업 중 오류가 발생했습니다:", error);
  }
});

// 회원가입

app.post("/addmem", async (req, res) => {
  console.log("회원가입 시도");
  console.log(req.body);
  let { id, pw, name, nick, phone, pws } = req.body;
  let sql = `insert into user_info values('${id}','${pw}','${name}','${nick}','${phone}','u', to_date(sysdate,'yyyy.mm.dd'))`;
  let sql2 = `select user_id from user_info where user_id = '${id}'`;
  try {
    const connection = await conn();
    // 이제 connection 객체를 사용하여 데이터베이스 작업을 수행할 수 있습니다.

    // 예: 간단한 쿼리 실행
    const result2 = await connection.execute(sql2);
    console.log(result2.rows);
    if (id.length <= 20 && pw.length <= 20 && nick.length <= 20) {
      if (
        result2.rows &&
        result2.rows.length > 0 &&
        result2.rows[0][0] === id
      ) {
        res.json({ result: "dupid" });
      } else {
        if (pw === pws) {
          const result = await connection.execute(sql, [], {
            autoCommit: true,
          });
          if (result.rowsAffected > 0) {
            res.json({ result: "success" });
          } else {
            res.json({ result: "failed" });
          }
        } else {
          res.json({ result: "notpw" });
        }
      }
    } else {
      res.json({ result: "long" });
    }

    // 연결 해제
    await connection.close();
  } catch (error) {
    console.error("데이터베이스 작업 중 오류가 발생했습니다:", error);
  }
});

// 로그인

app.post("/logintry", async (req, res) => {
  console.log("로그인 시도");
  let { id, pw } = req.body;

  let sql = `select * from user_info where user_id = '${id}' and user_pw = '${pw}'`;
  console.log(id, pw);
  // 여기서 데이터베이스 작업을 수행합니다.
  try {
    const connection = await conn();
    // 이제 connection 객체를 사용하여 데이터베이스 작업을 수행할 수 있습니다.

    // 예: 간단한 쿼리 실행
    const result = await connection.execute(sql);
    console.log(result.rows);
    res.json(result.rows[0]);

    // 연결 해제
    await connection.close();
  } catch (error) {
    console.error("데이터베이스 작업 중 오류가 발생했습니다:", error);
  }
});

// 아이디 찾기

app.post("/idtry", async (req, res) => {
  console.log("아이디 찾기");
  let { name, phone } = req.body;

  let sql = `select user_id from user_info where user_name = '${name}' and user_phone = '${phone}'`;
  console.log(name, phone);
  // 여기서 데이터베이스 작업을 수행합니다.
  try {
    const connection = await conn();
    // 이제 connection 객체를 사용하여 데이터베이스 작업을 수행할 수 있습니다.

    // 예: 간단한 쿼리 실행
    const result = await connection.execute(sql);
    console.log(result.rows);
    res.json(result.rows[0]);

    // 연결 해제
    await connection.close();
  } catch (error) {
    console.error("데이터베이스 작업 중 오류가 발생했습니다:", error);
  }
});

// 비번찾기

app.post("/pwtry", async (req, res) => {
  console.log("비밀번호 찾기");
  let { id, name, phone } = req.body;

  let sql = `select user_pw from user_info where user_id = '${id}' and user_name = '${name}' and user_phone = '${phone}'`;
  console.log(id, name, phone);
  // 여기서 데이터베이스 작업을 수행합니다.
  try {
    const connection = await conn();
    // 이제 connection 객체를 사용하여 데이터베이스 작업을 수행할 수 있습니다.

    // 예: 간단한 쿼리 실행
    const result = await connection.execute(sql);
    console.log(result.rows);
    res.json(result.rows[0]);

    // 연결 해제
    await connection.close();
  } catch (error) {
    console.error("데이터베이스 작업 중 오류가 발생했습니다:", error);
  }
});

// 밥주기 데이터 보내기

app.post("/datat", async (req, res) => {
  console.log("데이터 전송 시도");
  const data = req.body.data;
  const data2 = req.body.data2;
  console.log(data);
  try {
    const response = await axios.post("http://192.168.219.177:5000/test", {
      data: data,
      data2: data2,
    });
    console.log(response.data);
    res.json({
      message: "from flask",
      status: "success",
      data: response.data,
      data2: response.data2,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: "fail",
      status: "fail",
    });
  }
});

// 체중계데이터 받기

app.post("/data", (req, res) => {
  const receivedData = req.body;
  console.log("전송받은 데이터는", receivedData);

  const responseData = { message: "Data received successfully!" };
  res.json(responseData);
});

app.get("/databasetest", (req, res) => {
  console.log("디비 확인용 연결");
});

// 이미지 저장
// 이미지를 public/uploads 폴더에 저장하는 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./react-project/public/img");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 클라이언트에서 이미지를 받는 엔드포인트
app.post("/upload", upload.single("img"), (req, res) => {
  // 이미지 저장 후 public/uploads 폴더에 저장된 이미지의 경로를 클라이언트에게 전달
  const imagePath = "/img/" + req.file.filename;
  res.json({ imagePath });
});



//게시판 목록
app.post("/boardloading",async (req,res)=>{
  console.log("게시판페이지 로딩")
  const data = req.body.message
  console.log(data)
  if (data == "boardloading") {
      let sql =`select b_idx,b_title,DBMS_LOB.SUBSTR(b_content, 3000, 1) as C1,DBMS_LOB.SUBSTR(b_content, 4000, 3001) as C2,user_id,b_file from board_info order by b_idx `
      try {
          const connection = await conn();
          // 이제 connection 객체를 사용하여 데이터베이스 작업을 수행할 수 있습니다.
          
          const result = await connection.execute(sql);
          const ans = result.rows
          let board = {title : [],
                  content : [],
                  content2 : [],
                  user : [],
                  bIdx : [],
                  filename : []
              }
          console.log(ans)
          for(let i=0;i<result.rows.length;i++){
              board.title.push(ans[i][1]);
              board.content.push(ans[i][2]);
              if (ans[i][3] != null) {
                  board.content2.push(ans[i][3]);
              }
              board.user.push(ans[i][4]);
              board.bIdx.push(ans[i][0]);
              board.filename.push(ans[i][5])
          }
          console.log("borad:adfasdf",board)
          res.json(board)

          // 연결 해제 null
          await connection.close();
      } catch (error) {
          console.error('데이터베이스 작업 중 오류가 발생했습니다:', error);
      }
  }
})


// 게시판 글 상세페이지
app.get(`/boardread`,async (req,res)=>{
  const data = req.query.bIdx;
  console.log("게시판 글 조회 시도",data)
  
  try {
      // 데이터 베이스 부분
      const connection = await conn();
      let sql =`select b_title,DBMS_LOB.SUBSTR(b_content, 3000, 1) as C1,DBMS_LOB.SUBSTR(b_content, 4000, 3001) as C2,CREATED_AT,B_VIEWS,B_LIKES,B_FILE,USER_ID
                  from board_info where b_idx = '${data}'`
      // 게시글 관련 정보 전송 부분
      const result = await connection.execute(sql);
      console.log("게시판 글 정보 : ",result.rows);
      const ans = result.rows

      await connection.close();

      const connection2 = await conn();
      // 댓글 관련 정보 전송 부분 
      let sql2 = `select USER_ID,CMT_CONTENT,CREATED_AT from comment_info where b_idx = '${data}'`
      const result2 = await connection2.execute(sql2);
      console.log("댓글 정보 :", result2.rows);
      if (result2.rows.length != 0 ) {
          const ans2 = result2.rows
          console.log(ans2)
          let comments = {
              user2 : [],
              comment : [],
              comment_time : []
          }
          for(let i=0;i<ans2.length;i++){
              comments.user2.push(ans2[i][0]);
              comments.comment.push(ans2[i][1]);
              comments.comment_time.push(ans2[i][2]);
          }
          console.log("comments",comments)
          res.json({
              // 게시글 정보
              title : ans[0][0],
              content : ans[0][1],
              content2 : ans[0][2],
              time : ans[0][3],
              views : ans[0][4],
              likes : ans[0][5],
              img : ans[0][6],
              user : ans[0][7],
              comments
          })
      }
      else {
          res.json({
              // 게시글 정보
              title : ans[0][0],
              content : ans[0][1],
              content2 : ans[0][2],
              time : ans[0][3],
              views : ans[0][4],
              likes : ans[0][5],
              img : ans[0][6],
              user : ans[0][7]
          })
      }
      // 연결 해제

      await connection2.close();
  } catch (error) {
      console.error('데이터베이스 작업 중 오류가 발생했습니다:', error);
  }

})

//댓글글 작성 
app.get('/commentcreate',async (req,res)=>{
  const text = req.query.text;
  const idx = req.query.bIdx;
  const user = req.query.user
  console.log("comment",text,idx,user)
  try {
      const connection = await conn();
      // user_id 자리에는 세션에서 가져온 아이디값 가져올 예정
      let sql =`insert into comment_info(b_idx,CMT_CONTENT,cmt_likes,created_at,user_id) values('${idx}','${text}',10,sysdate,'${user}')`
      const result = await connection.execute(sql,[],{ autoCommit: true });
      console.log('Row inserted:', result.rowsAffected);


      // 연결 해제
      await connection.close();
  } catch (error) {
      console.error('데이터베이스 작업 중 오류가 발생했습니다:', error);
  }

})

// 게시글 작성
app.post("/createboard",async(req,res)=>{
  console.log("게시글 작성 버튼 서버에서 확인중",req.body)
  const {title,content,imgs,user } = req.body
  console.log("body values",title,content,imgs)
  // 데이터 베이스에 게시물 정보 넣기
  try {
    const connection = await conn();
    // user_id 자리에는 세션에서 가져온 아이디값 가져올 예정
    let sql =
    `insert into board_info(b_title,B_CONTENT,CREATED_AT,B_VIEWS,B_LIKES,B_FILE,USER_ID) values('${title}','${content}',sysdate,10,10,'${imgs}','${user}')`
    const result = await connection.execute(sql,[],{ autoCommit: true });
    console.log('Row inserted:', result.rowsAffected);


    // 연결 해제
        await connection.close();
    } catch (error) {
        console.error('데이터베이스 작업 중 오류가 발생했습니다:', error);
    }
    
})

// })

// 이미지 저장
// 이미지를 public/uploads 폴더에 저장하는 설정
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./react-project/public/boardimg");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload2 = multer({ storage: storage2 });

// 클라이언트에서 이미지를 받는 엔드포인트
app.post("/upload2", upload2.single("boardimg"), (req, res) => {
  // 이미지 저장 후 public/uploads 폴더에 저장된 이미지의 경로를 클라이언트에게 전달
  const imagePath = "/boardimg/" + req.file.filename;
});


app.listen(3000, () => {
  console.log("Node.js server is running on port 3000");
});