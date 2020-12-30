
import axios from 'axios'
import querystring from 'querystring'

const uri_part = process.env.AIRTABLE_URI_PART
const api_key = process.env.AIRTABLE_API_KEY

const http = axios.create({
  baseURL: 'https://api.airtable.com/v0/' + uri_part,
  headers: {
    'Content-type': 'application/json',
    'Authorization': 'Bearer ' + api_key
  }
})

module.exports = (req, res) => {
  http.get('/Skills')
  .then(response => {
    console.log(response.data)
    const skills = {}
    for (const record of response.data.records) {
      const key = record.fields.Field
      if (key in skills) {
        skills[key].push({
          id: record.id,
          text: record.fields.Subfield
        })
      } else {
        skills[key] = [{
          id: record.id,
          text: record.fields.Subfield
        }]
      }
    }
    const skills_array = []
    for (const field in skills) {
      let item = { skill: field }
      let details = []
      for (const detail of skills[field]) {
        switch (detail.text) {
          case "_senior":
            item['senior_id'] = detail.id
            break;
          case "_mentor":
            item['mentor_id'] = detail.id
            break;
          default:
            details.push(detail)
        }
      }
      item['details'] = details
      skills_array.push(item)
    }
    res.status(200).json({
      skills: skills_array
    })
  })
  .catch(e => {
    console.log(e)
    res.status(500).json({
      code: 50000,
      message: JSON.stringify(e.response)
    })
  })
/*
  res.status(200).json({
    skills: [
      {
        skill: "Design",
        details: [
          {
            id: "recu71mPBhoYZWTtq",
            text: "Mobilní"
          },
          {
            id: "recwSqRn0BRKxN7IF",
            text: "Web"
          }
        ],
        mentor_id: "recFgcjWmfXN42HyM",
        senior_id: "recwSqRn0BRKxN7IF"
      }
    ]
  })
  */
}
