/* eslint-disable prettier/prettier */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task.css'

export default class NewTaskPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      minutes: '',
      seconds: ''
    }
  }

  onSecondChange = (e) => {
    this.setState({
      seconds: e.target.value,
    })
  }

  onMinuteChange = (e) => {
    this.setState({
      minutes: e.target.value,
    })
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onTaskSubmit = (e) => {
    const { label, minutes, seconds } = this.state
    const { appendTodoItem } = this.props

    if (e.key === 'Enter' && e.target.value !== '') {
      appendTodoItem(label, minutes, seconds)
      this.setState({
        label: '',
        minutes: '',
        seconds: ''
      })
    }
  }

  render() {
    const { label, minutes, seconds } = this.state
    return (

      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={this.onTaskSubmit}
          onChange={this.onLabelChange}
          value={label}
        />
        <input
          type="number"
          min='0'
          className="new-todo-form__timer"
          placeholder="Min"
          onKeyDown={this.onTaskSubmit}
          onChange={this.onMinuteChange}
          value={minutes}
        />
        <input
          type="number"
          min='0'
          className="new-todo-form__timer"
          placeholder="Sec"
          onKeyDown={this.onTaskSubmit}
          onChange={this.onSecondChange}
          value={seconds}
        />
      </form>
    )
  }
}

NewTaskPanel.defaultProps = {
  appendTodoItem: () => { },
}
NewTaskPanel.propTypes = {
  appendTodoItem: PropTypes.func,
}
