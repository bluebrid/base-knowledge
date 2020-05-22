import Link from 'next/link'
import React, { Component } from 'react'
import ApiService from '../product-service/apiService'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'

class ListProductComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: [],
      message: null
    }
    this.deleteProduct = this.deleteProduct.bind(this)
    this.editProduct = this.editProduct.bind(this)
    this.addProduct = this.addProduct.bind(this)
    this.reloadProductList = this.reloadProductList.bind(this)
  }

  componentDidMount () {
    this.reloadProductList()
  }

  reloadProductList () {
    ApiService.fetchProducts()
      .then((res) => {
        this.setState({ products: res.data })
      })
  }

  deleteProduct (productId) {
    window.alert('Você tem certeza de apagar o produto')
    ApiService.deleteProduct(productId)
      .then(res => {
        this.setState({ products: this.state.products.filter(pro => pro._id !== productId) })
      })
  }

  editProduct (id) {
    window.localStorage.setItem('productId', id)
    window.location = '/edit-product'
  }

  addProduct () {
    window.localStorage.removeItem('productId')
  }

  render () {
    return (
      <div>
        <Typography variant='h4' style={styleTitle}>Products Details</Typography>
        <Link href='/add-product'><a style={linkStyle}>Add Product</a></Link>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='right'>Code</TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Description</TableCell>
              <TableCell align='right'>Update</TableCell>
              <TableCell align='right'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.products.map(prod => (
              <TableRow key={prod._id}>
                <TableCell component='th' scope='prod' align='right'>{prod.codigo}</TableCell>
                <TableCell align='right'>{prod.name}</TableCell>
                <TableCell align='right'>{prod.price}</TableCell>
                <TableCell align='right'>{prod.description}</TableCell>
                <TableCell align='right' onClick={() => this.editProduct(prod._id)}><CreateIcon /></TableCell>
                <TableCell align='right' onClick={() => this.deleteProduct(prod._id)}><DeleteIcon /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
    )
  }
}
const linkStyle = {
  padding: '8px',
  backgroundColor: '#3F51B5',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '2px',
  fontFamily: ' sans-serif'
}

const styleTitle = {
  display: 'flex',
  margin: '20px 0px',
  justifyContent: 'center'
}

export default ListProductComponent
