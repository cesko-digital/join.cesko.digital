
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

const getPage = (skills, offset=null) => {
  return new Promise((resolve, reject) => {
    const query = {
      pageSize: 100
    }
    if (offset) {
      query.offset = offset
    }
    http.get('/Skills?' + querystring.stringify(query))
    .then(response => {
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
      resolve({
        skills: skills,
        offset: response.data.offset
      })
    })
    .catch(e => {
      console.log(e)
      reject({
        message: JSON.stringify(e)
      })
    })
  })
}

module.exports = async (req, res) => {
  try {
    let skills = {}
    let page = await getPage(skills)
    while (page.offset) {
      skills = page.skills
      page = await getPage(skills, page.offset)
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
    res.status(200).json({ skills: skills_array })
  } catch (err) {
    res.status(500).json({
      code: 50000,
      message: JSON.stringify(err)
    })
  }
}
