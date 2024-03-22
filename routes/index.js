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
  var v_name = req.query.name;
  var v_typesId = req.query.department;
  var v_departmentsId = req.query.type;
  console.log(v_name,v_typesId,v_departmentsId);
  sql.query(` SELECT * FROM assets
              INNER JOIN departments 
              ON assets.departmentsId = departments.departmentsId
              INNER JOIN types ON assets.typesId = types.typesId
              WHERE name LIKE '${v_name}' OR name LIKE '${v_name}%'
              AND assets.typesId LIKE CONCAT('%', IFNULL('${v_typesId}', ''), '%')
              AND assets.departmentsId LIKE CONCAT('%', IFNULL('${v_departmentsId}', ''), '%')
              ORDER BY assets.code ASC;`
              , (err, res) => {
    if (err) throw err;
    result.json({ res });
    return ;
  })
});


module.exports = router;
