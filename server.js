const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const conn = require("./DB/db");
const path = require("path");
const multer  = require('multer');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "react-project", "build")));
// app.use(express.static(__dirname));

app.get("/", (req, res) => {
  console.log(__dirname);
  app.use("index");
});


// 이미지 디비넣기
// app.post("/upload",async (req,res)=>{
// }

// 회원가입 

app.post("/addmem",async (req,res)=> {
    console.log("회원가입 시도")
    console.log(req.body)
    let {id,pw,name,nick,phone,pws} = req.body;
    let sql =`insert into user_info values('${id}','${pw}','${name}','${nick}','${phone}','u', to_date(sysdate,'yyyy.mm.dd'))`
    let sql2 = `select user_id from user_info where user_id = '${id}'`
    try {
        const connection = await conn();
        // 이제 connection 객체를 사용하여 데이터베이스 작업을 수행할 수 있습니다.
        
        // 예: 간단한 쿼리 실행
        const result2 = await connection.execute(sql2);
        console.log(result2.rows);
        if(id.length<=20 && pw.length<=20 && nick.length<=20 ){
                if (result2.rows && result2.rows.length > 0 && result2.rows[0][0] === id) {
                    res.json({ result: "dupid" });
                } else {
                    if(pw === pws){
                        const result = await connection.execute(sql, [], { autoCommit: true });
                        if (result.rowsAffected > 0) {
                            res.json({ result: "success" });
                        } else {
                            res.json({ result: "failed" });
                        }
                        }else{
                            res.json({ result : "notpw"})
                        }
            }
        }else{
            res.json({result: 'long'})
        }
        
        
        // 연결 해제
        await connection.close();
    } catch (error) {
        console.error('데이터베이스 작업 중 오류가 발생했습니다:', error);
    }
})

 


// 로그인 

app.post("/logintry", async (req, res) => {
  console.log("로그인 시도");
  let { id, pw } = req.body;

  let sql = `select user_nick from user_info where user_id = '${id}' and user_pw = '${pw}'`;
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

app.listen(3000, () => {
  console.log("Node.js server is running on port 3000");
});

// 이미지 저장
// 이미지를 public/uploads 폴더에 저장하는 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './react-project/public/img')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// 클라이언트에서 이미지를 받는 엔드포인트
app.post('/upload', upload.single('img'), (req, res) => {
    // 이미지 저장 후 public/uploads 폴더에 저장된 이미지의 경로를 클라이언트에게 전달
    const imagePath = '/uploads/' + req.file.filename;
    res.json({ imagePath });
});

