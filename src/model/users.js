const pool = require('../config/db')

const registerUser = ({id, fullname, email, password, role, status }) => {
    return pool.query(`INSERT INTO users (id, fullname, email, password, role, status) VALUES ('${id}','${fullname}','${email}','${password}', '${role}','${status}')`)
}
const searchUser = (email) => {
    return pool.query(`SELECT * FROM users WHERE email = '${email}'`)
}
const activateUser = ({email, status}) => {
    return pool.query(`UPDATE users SET status = '${status}' WHERE email= '${email}'`)
}

module.exports = {
    registerUser, searchUser, activateUser
}