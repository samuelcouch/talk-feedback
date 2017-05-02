import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3'

import { Feedback, Total } from '../../models'

const tone_analyzer = new ToneAnalyzerV3({
  username: process.env.TONE_ANALYZER_USERNAME,
  password: process.env.TONE_ANALYZER_PASSWORD,
  version_date: '2016-05-19'
})

export function analyze_and_save (message, callback) {
  tone_analyzer.tone({
    text: message
  }, function (err, ananlysis) {
    if (!err) {
      let tones = unpackTones(ananlysis.document_tone.tone_categories)
      tones['feedback'] = message
      Feedback.create(tones).then((feedback) => {
        Total.findById(1).then((total) => {
          let updated = {
            total: total.total + 1,
            anger: total.anger + tones.anger,
            disgust: total.disgust + tones.disgust,
            fear: total.fear + tones.fear,
            joy: total.joy + tones.joy,
            sadness: total.sadness + tones.sadness,
            analytical: total.analytical + tones.analytical,
            confident: total.confident + tones.confident,
            tentative: total.tentative + tones.tentative,
            openness: total.openness + tones.openness,
            conscientiousness: total.conscientiousness + tones.conscientiousness,
            extraversion: total.extraversion + tones.extraversion,
            agreeableness: total.agreeableness + tones.agreeableness,
            emotional_range: total.emotional_range + tones.emotional_range
          }
          return total.update(updated)
                      .then(() => callback(total.dataValues, null))
                      .catch((error) => callback({}, error))
        })
      }).catch((error) => callback({}, error))
    }
  })
}

function unpackTones(blob) {
  let res = {}

  for (let category of blob) {
    for (let tone of category.tones) {
      let key = tone.tone_id

      if(key.indexOf('_big5') > -1) {
        key = key.substr(0, key.indexOf('_big5'))
      }

      res[key] = tone.score
    }
  }

  return res
}
