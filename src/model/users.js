const pool = require('../config/db')

const registerUser = ({id, fullname, email, password, role, storename, phone, status}) => {
    return pool.query('INSERT INTO users (id, fullname, email, password, role, status, phone, storename) VALUES ($1,$2,$3,$4, $5,$6, $7, $8 )',[id, fullname, email, password, role, status, phone, storename])
}
const searchUser = (email) => {
    return pool.query(`SELECT * FROM users WHERE email = '${email}'`)
}
const activateUser = ({email, status}) => {
    return pool.query(`UPDATE users SET status = '${status}' WHERE email= '${email}'`)
}
const updateUser = ({fullname, email, phone, gender, birth, photo, id}) => {
    return pool.query('UPDATE users SET fullname = COALESCE($1, fullname), email = COALESCE($2, email), phone = COALESCE($3, phone), gender = COALESCE($4, gender), birth = COALESCE($5, birth), photo = COALESCE($6, photo) WHERE id = $7',[fullname, email, phone, gender, birth, photo, id])
}

module.exports = {
    registerUser, searchUser, activateUser, updateUser
}