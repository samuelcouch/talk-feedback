import React from 'react'
import { Header, Jumbotron } from 'watson-react-components'

class Layout extends React.Component {
  render() {
    const DESCRIPTION = '"The IBM Watson™ Tone Analyzer service uses linguistic analysis to detect communication tones in written text." In this demo we will request conference antendees to submit feedback on our talk in order to assess our performance.'
    return (
      <html lang="en">
        <head>
          <title>Talk Feedback</title>
          <meta charSet="utf-8" />
          <link rel="stylesheet" href="/css/watson-react-components.min.css" />
          <link rel="stylesheet" href="/css/react-vis/style.css" />
        </head>
        <body>
          <Jumbotron
            serviceName="Tone Analyzer"
            repository={null}
            documentation={null}
            apiReference={null}
            version="GA"
            startInBluemix={null}
            description={DESCRIPTION}
          />
          <div id="root">
            {this.props.children}
          </div>
          <script type="text/javascript" src="js/bundle.js" />
        </body>
      </html>
    )
  }
}

export default Layout
