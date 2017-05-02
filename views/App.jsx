import React, { Component, PropTypes } from 'react'
import $ from 'jquery'

import { InputWithButton } from 'watson-react-components'

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
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

  onSubmitFeedback() {
    console.log('okokokok')
  }

  render() {
    return (
      <div className="_container _container_large">
        <div className="row">
          <InputWithButton
            onSubmit={this.onSubmitFeedback}
            placeholder="Input some text here"
          />
          <XYPlot
            margin={{top: 70}}
            xType="ordinal"
            width={800}
            height={300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-45} />
            <YAxis />
            <VerticalBarSeries
              data={[
                {x: 'Apples', y: 12},
                {x: 'Bananas', y: 2},
                {x: 'Cranberries', y: 11},
                {x: 'test', y: 1 },
                {x: 'test1', y: 1 },
                {x: 'test2', y: 1 },
                {x: 'test3', y: 1 },
                {x: 'test4', y: 1 },
                {x: 'test5', y: 1 },
                {x: 'test6', y: 1 },
                {x: 'test7', y: 1 },
                {x: 'test8', y: 1 },
                {x: 'test9', y: 1 }
              ]}/>
          </XYPlot>
        </div>
      </div>
    )
  }
}
