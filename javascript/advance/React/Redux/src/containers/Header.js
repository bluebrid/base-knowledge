import React from 'react'
import { connect } from '../reactRedux'
import PropTypes from 'prop-types'
import TodoTextInput from '../components/TodoTextInput'
import { addTodo } from '../actions'

export const Header = ({ addTodo, title}) => (
  <header className="header">
     <h1>{title}</h1> 
    <TodoTextInput
      newTodo
      onSave={(text) => {
        if (text.length !== 0) {
          addTodo(text)
        }
      }}
      placeholder="What needs to be done?"
    />
  </header>
)

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
 //  title: PropTypes.string.isRequired
}
const mapStateToProps = (state, ownProps) => {
  console.log('=======================')
  return {
    title:  state.title
  }
}
const hoc =  connect(mapStateToProps, { addTodo })
export default hoc(Header)