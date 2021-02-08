/* eslint no-console: ["error", { allow: ["log"] }] */
import axios from 'axios'
//import querystring from 'querystring'

const uri_part = process.env.AIRTABLE_URI_PART
const api_key = process.env.AIRTABLE_API_KEY

const http = axios.create({
  baseURL: 'https://api.airtable.com/v0/' + uri_part,
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + api_key,
  },
})

module.exports = (req, res) => {
  console.log(req.body)
  http
    .post('/Registrations', {
      records: [
        {
          fields: {
            Name: req.body.name,
            Email: req.body.email,
            Skills: req.body.options_selected,
          },
        },
      ],
    })
    .then((response) => {
      console.log(response.data.records)
      res.status(201).json({
        code: 201000,
        message: 'Volunteer created.',
      })
    })
    .catch((e) => {
      console.log(e)
      res.status(500).json({
        code: 50000,
        message: e.message || 'Server error',
      })
    })
}
