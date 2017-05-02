import React, { Component, PropTypes } from 'react'
import $ from 'jquery'

import { InputWithButton } from 'watson-react-components'
import Bar from 'watson-react-components/dist/components/Bar'

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalBarSeries,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
    }
  }

  onSubmitFeedback(e) {
    let text = e.target.value
    if (text.length > 0) {
      $.post('/feedback', { text }).done((data) => this.setState({ data }))
    }
  }

  render() {
    return (
      <div className="_container _container_large">
        <div className="row">
          <h2 className="base--h2">Leave some feedback</h2>
          <InputWithButton
            onSubmit={this.onSubmitFeedback.bind(this)}
            placeholder="Tell me your thoughts..."
          />
        </div>
        <div className="row">
          <h2 className="base--h2">Output</h2>
          <div className="row">
            <div>
              <p>emotional_range</p>
              <Bar score={-25} rangeStart={-100} rangeEnd={100} />
              <p>emotional_range</p>
              <Bar score={-25} rangeStart={-100} rangeEnd={100} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
