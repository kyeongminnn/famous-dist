const { pool } = require("../../config/database");

exports.selectRestaurants = async function (connection, category) {
  const selectAllRestaurantsQuery = `SELECT title, address, category, videoUrl FROM Restaurants where status = 'A';`;
  const selectCategorizedRestaurantsQuery = `SELECT title, address, category, videoUrl FROM Restaurants where status = 'A' and category = ?;`;

  const Params = [category];

  const Query = category
    ? selectCategorizedRestaurantsQuery
    : selectAllRestaurantsQuery;

  const rows = await connection.query(Query, Params);

  return rows;
};


exports.deleteStudent = async function (connection, studentIdx) {
  const Query = `update Student set status = "D" where studentIdx = ? and status = 'A';`;
  const Params = [studentIdx];

  const rows = await connection.query(Query, Params);

  return rows;
};


exports.updateStudent = async function (
  connection,
  studentIdx,
  studentName, 
  major, 
  birth, 
  address
  ) {
  const Query = `update Student set studentName = ifnull(?, studentName), major = ifnull(?, major), birth = ifnull(?, birth), address = ifnull(?, address) where studentIdx = ?;`;
  const Params = [
    studentName, 
    major, 
    birth, 
    address,
    studentIdx];

  const rows = await connection.query(Query, Params);

  return rows;
};


exports.isValidStudentIdx = async function (connection, studentIdx) {
  const Query = `SELECT * FROM Student where studentIdx = ?;`;
  const Params = [studentIdx];

  const [rows] = await connection.query(Query, Params);

  if(rows < 1){
    return false
  }

  return true;
};


exports.insertStudent = async function (connection, studentName, major, birth, address) {
  const Query = `insert into Student(studentName, major, birth, address) values(?, ?, ?, ?);`;
  const Params = [studentName, major, birth, address];

  const rows = await connection.query(Query, Params);

  return rows;
};



exports.selectStudent = async function (connection, studentIdx) {
  const Query = `SELECT * FROM Student where studentIdx = ?;`;
  const Params = [studentIdx];

  const rows = await connection.query(Query, Params);

  return rows;
};



exports.exampleDao = async function (connection) {
  const Query = `SELECT * FROM Student;`;
  const Params = [];

  const rows = await connection.query(Query, Params);

  return rows;
};

// 회원가입
exports.insertUsers = async function (connection, userID, password, nickname) {
  const Query = `insert into Users(userID, password, nickname) values (?,?,?);`;
  const Params = [userID, password, nickname];

  const rows = await connection.query(Query, Params);

  return rows;
};

// 로그인 (회원검증)
exports.isValidUsers = async function (connection, userID, password) {
  const Query = `SELECT userIdx, nickname FROM Users where userID = ? and password = ? and status = 'A';`;
  const Params = [userID, password];

  const rows = await connection.query(Query, Params);

  return rows;
};

