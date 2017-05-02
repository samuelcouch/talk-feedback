import React, { Component, PropTypes } from 'react'
import $ from 'jquery'

import { InputWithButton } from 'watson-react-components'
import Bar from 'watson-react-components/dist/components/Bar'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        total: 0,
        anger: 0.0,
        disgust: 0.0,
        fear: 0.0,
        joy: 0.0,
        sadness: 0.0,
        analytical: 0.0,
        confident: 0.0,
        tentative: 0.0,
        openness: 0.0,
        conscientiousness: 0.0,
        extraversion: 0.0,
        agreeableness: 0.0,
        emotional_range: 0.0
      },
    }
  }

  componentDidMount() {
    $.post('/api/totals')
    .done((data) => this.setState({ data }))
  }

  onSubmitFeedback(e) {
    let text = e.target.value
    if (text.length > 0) {
      $.post('/feedback', { text })
      .done((data) => this.setState({ data }))
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
              <p>Anger</p>
              <Bar score={(this.state.data.anger/this.state.data.total)*100} rangeStart={0} rangeEnd={100} />
              <p>Disgust</p>
              <Bar score={(this.state.data.disgust/this.state.data.total)*100} rangeStart={0} rangeEnd={100} />
              <p>fear</p>
              <Bar score={(this.state.data.fear/this.state.data.total)*100} rangeStart={0} rangeEnd={100} />
              <p>joy</p>
              <Bar score={(this.state.data.joy/this.state.data.total)*100} rangeStart={0} rangeEnd={100} />
              <p>sadness</p>
              <Bar score={(this.state.data.sadness/this.state.data.total)*100} rangeStart={0} rangeEnd={100} />
              <p>analytical</p>
              <Bar score={(this.state.data.analytical/this.state.data.total)*100} rangeStart={0} rangeEnd={100} />
              <p>confident</p>
              <Bar score={(this.state.data.confident/this.state.data.total)*100} rangeStart={0} rangeEnd={100} />
              <p>tentative</p>
              <Bar score={(this.state.data.tentative/this.state.data.total)*100} rangeStart={0} rangeEnd={100} />
              <p>openness</p>
              <Bar score={(this.state.data.openness/this.state.data.total)*100} rangeStart={0} rangeEnd={100} />
              <p>conscientiousness</p>
              <Bar score={(this.state.data.conscientiousness/this.state.data.total)*100} rangeStart={0} rangeEnd={100} />
              <p>extraversion</p>
              <Bar score={(this.state.data.extraversion/this.state.data.total)*100} rangeStart={0} rangeEnd={100} />
              <p>agreeableness</p>
              <Bar score={(this.state.data.agreeableness/this.state.data.total)*100} rangeStart={0} rangeEnd={100} />
              <p>emotional_range</p>
              <Bar score={(this.state.data.emotional_range/this.state.data.total)*100} rangeStart={0} rangeEnd={100} />
            </div>
          </div>
          <div className="row"></div>
        </div>
      </div>
    )
  }
}
