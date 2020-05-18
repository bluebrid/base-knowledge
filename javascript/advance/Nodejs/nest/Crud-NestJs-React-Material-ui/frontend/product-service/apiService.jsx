import axios from 'axios'
// Base
const API_BASE_URL = 'http://localhost:5000/products/'
// all
const products = 'products'
// Delete
const deleteUrl = 'delete?productID='
// Edit
const editUrl = 'edit?productID='

class ApiService {
  fetchProducts () {
    return axios.get(API_BASE_URL + products)
  }

  fetchProductById (productId) {
    return axios.get(API_BASE_URL + 'product' + '/' + productId)
  }

  deleteProduct (productId) {
    return axios.delete(API_BASE_URL + deleteUrl + productId)
  }

  addProduct (productOb) {
    return axios.post(API_BASE_URL + 'product', productOb)
  }

  editProduct (productId, productOb) {
    return axios.put(API_BASE_URL + editUrl + productId, productOb)
  }
}

export default new ApiService()
