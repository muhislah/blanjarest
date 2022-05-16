
# Blanja Restful API

Restful API created with express js framework 




## API Reference

#### Get Detail products

```http
  GET /products/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `number` | **Required**. id products |

#### Get Products With Pagination

```http
  GET /products?
```

| Query | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `search`      | `string` | **Optional**. Used to Search with key |
| `sortby`      | `string` | **Optional**. to sort result |
| `sort`      | `string` | **ASC \|\| DESC** Default ASC |
| `limit`      | `number` | **Optional** Limit result |
| `page`      | `number` | **Optional** Default Page 1 |

#### Insert Product 

```http
  POST /products
```
Require body message

```json
{
    "name" : "name-product",
    "description" : "describe your products",
    "price" : 90000
    "stock" : 100
    "category_id" : 1
}
```
Also you can insert with form-data using POSTMAN




## Authors

- [@muhislah](https://www.github.com/muhislah)

