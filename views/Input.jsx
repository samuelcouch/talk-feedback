import React, { Component, PropTypes } from 'react'

export default class Input extends Component {
  constructor(props) {
      super(props)

      this.state = {
        text: ''
      }
  }

  onSubmit() {
    this.props.onSubmitFeedback(this.state.text)
  }

  handleInputChange(e) {
    this.setState({ text: e.target.value })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onSubmitFeedback(this.state.text);
    }
  }

  render() {
    return (
      <div>
        <div className="feedback-input">
          <div className="feedback-input-container">
            <input
              type=""
              autoFocus
              value={this.state.text}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              id="question"
              placeholder="Tell me your thoughts"
              className="base--input question-input--input"
              required="true"
            />
          </div>
          <div className="feedback-input-button-container">
            <button
              disabled={this.state.text.trim().length === 0}
              onClick={this.onSubmit.bind(this)}
              className="base--button feedback-input--submit-button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  onSubmitFeedback: React.PropTypes.func.isRequired,
}
