import NavBar from '../components/Navbar'
import ListProductComponent from './products'
import Container from '@material-ui/core/Container'

export default function Index () {
  return (
    <div>
      <NavBar />
      <Container>
        <ListProductComponent />
      </Container>
    </div>
  )
}
