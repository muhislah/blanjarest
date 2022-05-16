const pool = require("../config/db")

const getData = (id) => {
    return pool.query(`SELECT p.name, p.price, p.stock FROM categories as c JOIN products as p ON c.id = p.category_id WHERE c.id = ${id}`)
}
const getAll = () => {
    return pool.query(`SELECT id, name FROM categories ORDER BY id`)
}
const getName = (id) => {
    return pool.query(`SELECT name FROM categories WHERE id = ${id}`)
}
const insertData = (id, name) => {
    return pool.query(`INSERT INTO categories (id, name) VALUES (${id}, '${name}')`)
}
const updateData = (id, name) => {
    return pool.query(`UPDATE categories SET name = '${name}' WHERE id = ${id};`)
}
const deleteData = (id) => {
    return pool.query(`DELETE FROM categories WHERE id = ${id}`)
}

module.exports = { getData, getName, getAll , insertData, updateData, deleteData}