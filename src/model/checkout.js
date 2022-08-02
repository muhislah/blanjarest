const pool = require("../config/db")

const getCheckout = (id) => {
    return pool.query('SELECT c.id, c.user_id, c.status, c.stock, p.photo, p.id as product_id, a.name as address_name, a.type, p.name, p.price from checkout as c LEFT JOIN products as p ON c.product_id = p.id JOIN address as a ON c.address_id = a.id WHERE c.user_id = $1',[id])
}
const addCheckout = ({id, user_id, stock , product_id, status = "pending", address_id}) => {
    return pool.query('INSERT INTO checkout (id, stock, user_id, product_id, status, address_id) VALUES ($1, $2, $3, $4, $5, $6)',[id, stock, user_id, product_id, status, address_id])
}
const deleteCheckout = (id) => {
    return pool.query(`DELETE FROM checkout WHERE id = ${id}`)
}

module.exports = { getCheckout, addCheckout, deleteCheckout }