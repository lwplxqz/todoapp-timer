/* eslint-disable prettier/prettier */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './todo-list-item.css'

export default class TodoListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      created: new Date(),
      timeToNow: formatDistanceToNow(new Date()),
      isEditing: false,
      editedValue: '',
      isCounting: false,
    }
  }



  componentDidMount() {

    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    const { isCounting } = this.state
    const { timeLeft, onTimerChange, id } = this.props
    if (isCounting && prevState !== this.state) {
      onTimerChange(timeLeft - 1, id)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }


  handleStop = () => {
    this.onTimerSwitch()
  }

  handlePlay = () => {
    this.onTimerSwitch()
  }

  switchEditing = () => {
    const { isEditing } = this.state
    this.setState({
      isEditing: !isEditing
    })
  }


  setEditedValue = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      const { editedValue } = this.state
      const { editLabel, id } = this.props
      editLabel(editedValue, id)

      this.setState({
        isEditing: false
      })
    }
  }

  getPadTime = (time) => time.toString().padStart(2, '0')

  onTimerSwitch = () => {
    const { isCounting } = this.state
    this.setState(() => {
      return { isCounting: !isCounting }
    })

  }

  tick() {
    const { created } = this.state
    this.setState({ timeToNow: formatDistanceToNow(created) })
  }

  render() {
    const {
      label, onDeleted, onToggleDone, done, timeLeft
    } = this.props

    const { isEditing, isCounting, timeToNow } = this.state
    // console.log(isCounting)



    let classNames = ''

    if (done) {
      classNames += 'completed'
    }

    if (isEditing) {
      classNames = 'editing'
    }

    return (
      <li className={classNames}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            onChange={onToggleDone}
            defaultChecked={done}
          />
          <label htmlFor='id'>
            <span className='title'>{label}</span>
            <span className='description'>
              {isCounting ? (
                <button
                  type='button'
                  aria-label="icon-pause"
                  className="icon icon-pause"
                  onClick={this.handleStop} />
              ) : (
                <button
                  type='button'
                  aria-label="icon-play"
                  className="icon icon-play"
                  onClick={this.handlePlay} />
              )}

              {`  ${this.getPadTime(Math.floor(timeLeft / 60))}:${this.getPadTime(timeLeft % 60)}`}
            </span>
            <span className='description'>
              Created {' '}
              {timeToNow}
              {' '}
              ago
            </span>
          </label>
          <button type='button' aria-label="edit" className='icon icon-edit' onClick={this.switchEditing} />
          <button type='button' aria-label='destroy' className='icon icon-destroy' onClick={onDeleted} />
        </div>
        <input
          type='text'
          className='edit'
          placeholder='Type new label'
          onChange={(e) => { this.setState({ editedValue: e.target.value }) }}
          onKeyDown={this.setEditedValue}
        />
      </li>
    )
  }
}
TodoListItem.defaultProps = {
  label: 'undefiend',
  onDeleted: () => { },
  onToggleDone: () => { },
  done: false,
  editLabel: () => { }
}

TodoListItem.propTypes = {
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  editLabel: PropTypes.func
}
