const pool = require("../config/db")

const getCart = (id) => {
    return pool.query('SELECT c.id, c.user_id, c.stock, p.photo,  p.id as product_id, p.name, p.price from cart as c JOIN products as p ON c.product_id = p.id WHERE c.user_id = $1',[id])
}
const searchCart = (product_id, user_id) => {
  return pool.query('SELECT * FROM cart where product_id = $1 AND user_id = $2', [product_id, user_id])
}
const addCart = ({id, user_id, stock = 1 , product_id}) => {
    return pool.query('INSERT INTO cart (id, stock, user_id, product_id) VALUES ($1, $2, $3, $4)',[id, stock, user_id, product_id])
}
const updateCart = (id, stock) => {
    return pool.query('UPDATE cart SET stock = $1 WHERE id = $2',[stock, id])
}
const deleteCart = (id) => {
    return pool.query('DELETE FROM cart WHERE id = $1',[id])
}

module.exports = { getCart, addCart, deleteCart, updateCart, searchCart }