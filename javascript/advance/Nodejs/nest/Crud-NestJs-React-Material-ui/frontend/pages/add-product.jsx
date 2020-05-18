import { Component } from 'react'
import ApiService from '../product-service/apiService'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import NavBar from '../components/Navbar'

class AddProductComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      codigo: '',
      name: '',
      description: '',
      price: ''
    }
    this.handleSaveProduct = this.handleSaveProduct.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSaveProduct (e) {
    const product = {
      codigo: Number(this.state.codigo),
      name: this.state.name,
      description: this.state.description,
      price: Number(this.state.price)
    }
    e.preventDefault()

    ApiService.addProduct(product)
      .then(res => {
        this.setState({ message: 'Product added successfully.' })
        window.location = '/'
      })
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    return (
      <div>
        <NavBar />
        <Typography variant='h4' style={style}>Add Product</Typography>
        <form style={formContainer}>
          <TextField type='number' placeholder='codigo' fullWidth margin='normal' name='codigo' value={this.state.codigo} onChange={this.handleChange} />
          <TextField type='text' placeholder='name' fullWidth margin='normal' name='name' value={this.state.name} onChange={this.handleChange} />
          <TextField type='text' placeholder='description' fullWidth margin='normal' name='description' value={this.state.description} onChange={this.handleChange} />
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

const style = {
  padding: '20px 0px',
  display: 'flex',
  justifyContent: 'center'

}
export default AddProductComponent
