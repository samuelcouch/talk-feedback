import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3'

const tone_analyzer = new ToneAnalyzerV3({
  username: process.env.TONE_ANALYZER_USERNAME,
  password: process.env.TONE_ANALYZER_PASSWORD,
  version_date: '2016-05-19'
})

export function analyze_and_save (message, db, callback) {
  tone_analyzer.tone({
    text: message.Body
  }, function (err, tone) {
    if (!err) {
      db.ref('feedback').push(tone.document_tone.tone_categories, (err) => {
        callback()
      })
    }
  })
}
