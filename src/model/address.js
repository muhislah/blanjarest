const pool = require("../config/db")

const getAddress = (id) => {
    return pool.query('SELECT * FROM address WHERE user_id = $1',[id])
}
const addAddress = ({id, type, name, phone, address, postalcode, city, user_id}) => {
    return pool.query('INSERT INTO address (id, type, name, phone, address, postalcode, city, user_id) values ($1, $2 ,$3 ,$4 ,$5 ,$6 ,$7 ,$8 )', [id, type, name, phone, address, postalcode, city, user_id] )
}
const updateAddress = ({id, type, name, phone, address, postalcode, city}) => {
    return pool.query('UPDATE address SET type = COALESCE($1, type) , name = COALESCE($2, name) , phone = COALESCE($3, phone), address = COALESCE($4, address), postalcode = COALESCE($5, postalcode), city = COALESCE($6, city) WHERE id = $7', [type, name, phone, address, postalcode, city , id])
}

const deleteAddress = (id) => {
    return pool.query('DELETE FROM address WHERE id = $1', [id])
}

module.exports = { getAddress, addAddress, updateAddress , deleteAddress }