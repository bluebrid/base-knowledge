import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const style = {
  flexGrow: 1
}
const NavBar = () => {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='Menu' />
          <Typography variant='h6' style={style}>Ivan Fan | React</Typography>
          <Button color='inherit'><ShoppingCartIcon /></Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
