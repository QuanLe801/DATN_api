var express = require('express');
var router = express.Router();
const sql = require("../utils/db")

/* GET home page. */
router.get('/Assets', function (req, result, next) {
  sql.query(`SELECT * FROM assets INNER JOIN departments 
  ON assets.departmentsId = departments.departmentsId
  INNER JOIN types ON assets.typesId = types.typesId;`, (err, res) => {
    if (err) throw err;
    result.json({ res });
    return ;
  })
});

router.get('/Types', function (req, result, next) {
  sql.query(`SELECT * FROM types`, (err, res) => {
    if (err) throw err;
    result.json({ res });
    return ;
  })
});

router.get('/Departments', function (req, result, next) {
  sql.query(`SELECT * FROM departments`, (err, res) => {
    if (err) throw err;
    result.json({ res });
    return ;
  })
});

router.get('/Assets/GetPaging', function (req, result, next) {
  var v_id = req.query.id;
  var v_typesId = req.query.department;
  var v_departmentsId = req.query.type;
  console.log(v_id,v_typesId,v_departmentsId);
  try {
    sql.query(` SELECT * FROM assets
                INNER JOIN departments 
                ON assets.departmentsId = departments.departmentsId
                INNER JOIN types ON assets.typesId = types.typesId
                WHERE code = '${v_id}' 
                AND assets.typesId LIKE CONCAT('%', IFNULL('${v_typesId}', ''), '%')
                AND assets.departmentsId LIKE CONCAT('%', IFNULL('${v_departmentsId}', ''), '%')
                ORDER BY assets.code ASC;`, (err, res) => {
    if (err) {
      result.status(500).send('Error Query');
      return;
    }
      result.json({ res });
      return ;
    })
  } catch (error) {
    console.error('Error executing query:', error);
  }
});

router.post('/login', function(req, result, next) {
  const payload = req.body;
  sql.query(`SELECT * FROM users WHERE username = '${payload.username}' AND password = '${payload.password}';`,
    (err, res) => {
      if (err) {
        // Xử lý lỗi SQL nếu có
        console.error(err);
        result.status(500).send('Lỗi máy chủ');
        return;
      }

      const userData = res[0]; // Lấy dữ liệu từ hàng đầu tiên trong kết quả
      console.log(userData);

      if (userData) {
        result.status(200).json(userData);
      } else {
        result.status(404).send('Tên đăng nhập không đúng');
      }
    }
  );
});


module.exports = router;
