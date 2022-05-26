import React, { Component } from 'react'
import ApiService from '../product-service/apiService'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import NavBar from '../components/Navbar'

class EditProductComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      codigo: '',
      name: '',
      description: '',
      price: ''
    }

    this.loadProduct = this.loadProduct.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSaveProduct = this.handleSaveProduct.bind(this)
  }

  componentDidMount () {
    this.loadProduct()
  }

  loadProduct () {
    ApiService.fetchProductById(window.localStorage.getItem('productId')).then(
      res => {
        const product = res.data
        this.setState({
          codigo: product.codigo,
          name: product.name,
          description: product.description,
          price: product.price
        })
      }
    )
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSaveProduct (e) {
    e.preventDefault()
    const product = {
      codigo: this.state.codigo,
      name: this.state.name,
      description: this.state.description,
      price: this.state.price
    }
    ApiService.editProduct(window.localStorage.getItem('productId'), product).then(res => {
      window.alert('Product update successfully.')
      window.location = '/'
    })
  }

  render () {
    return (
      <div>
        <NavBar />
        <Typography variant='h4' style={titleStyle}>Edit Product</Typography>
        <form style={formContainer}>
          <TextField type='number' placeholder='code' fullWidth margin='normal' name='code' readOnly='{true}' value={this.state.codigo} />
          <TextField placeholder='Name' fullWidth margin='normal' name='name' value={this.state.name} onChange={this.handleChange} />
          <TextField placeholder='Description' fullWidth margin='normal' name='description' value={this.state.description} onChange={this.handleChange} />
          <TextField type='number' placeholder='price' fullWidth margin='normal' name='price' value={this.state.price} onChange={this.handleChange} />
          <Button variant='contained' color='primary' onClick={this.handleSaveProduct}>Save</Button>

        </form>
      </div>
    )
  }
}
const formContainer = {
  display: 'flex',
  flexFlow: 'row wrap',
  padding: '30px'
}
const titleStyle = {
  padding: '20px 0px',
  display: 'flex',
  justifyContent: 'center'
}

export default EditProductComponent
