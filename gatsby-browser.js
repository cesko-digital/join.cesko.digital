/**
 * Implement Gatsby's Browser APIs in this file.
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
const React = require('react')
const Theme = require('cesko-digital-web/src/theme').Theme

exports.wrapPageElement = ({ element, props }) => {
  return <Theme {...props}>{element}</Theme>
}
