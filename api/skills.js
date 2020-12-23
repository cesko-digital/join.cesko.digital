
module.exports = (req, res) => {
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
}
