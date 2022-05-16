const pool = require("../config/db")

const getData = ({search, orderby, order, limit, offset}) => {
    if (!search){
        return pool.query(`SELECT id,name,price,stock FROM products ORDER BY ${orderby} ${order} LIMIT ${limit} OFFSET ${offset}`)
    }
    return pool.query(`SELECT id,name,price,stock FROM products  WHERE name ILIKE '%${search}%' ORDER BY ${orderby} ${order} LIMIT ${limit} OFFSET ${offset}`) 
}
const getDetail = (id) => {
    return pool.query('SELECT p.id, p.name, p.description, p.price, p.stock, c.name AS category_name, p.created_at, p.updated_at FROM products AS p JOIN categories AS c ON p.category_id = c.id WHERE p.id = $1 ',[id])
}
const countData = (search) => {
    if (!search){
        return pool.query("SELECT COUNT(*) AS total FROM products")
    }
    return pool.query(`SELECT COUNT(*) AS total FROM products WHERE name ILIKE '%${search}%'`)
}
const insertData = ({name, description, price,stock, category_id, photo}) => {
    return pool.query(`INSERT INTO products (name,description,price,stock,category_id, photo) VALUES ('${name}','${description}',${price},${stock},${category_id}, '${photo}')`)
}
const updateData = ({name, description, price, stock, category_id, id}) => {
    return pool.query(`
    UPDATE products SET
        name = COALESCE('${name}', name),
        description = COALESCE('${description}', description),
        price = COALESCE(${price}, price),
        stock = COALESCE(${stock}, stock),
        category_id = COALESCE(${category_id}, category_id),
        updated_at = NOW()
    WHERE id = ${id}`)
}
const deleteData = (id) => {
    return pool.query(`DELETE FROM products WHERE id = ${id}`)
}

module.exports = { getData, countData, insertData, getDetail, updateData, deleteData}