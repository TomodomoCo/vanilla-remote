var request = require('request-promise')
var cheerio = require('cheerio')
var through2 = require('through2')
var defaults = require('defaults')

// Set up request
var request = request.defaults({
  jar: true,
  transform: function (body) {
    return cheerio.load(body)
  }
})

/**
 * Utility function to log into a Vanilla install
 */
function login (loginOptions) {
  // Login options
  loginOptions = defaults(loginOptions, {
    user: null,
    pass: null,
    base: null,
    signinPath: '/entry/signin',
  })

  // Return the whole thing so it can be used
  // with an ongoing promise chain
  return request.get({
    url: options.base + options.signinPath,
  }).then(function ($) {
    // Fetch the Transient Key
    var transientKey = $('#Form_TransientKey').val()

    // Build the form data
    var data = {
      'hpt': '',
      'Target': '/',
      'TransientKey': transientKey,
      'Email': options.user,
      'Password': options.pass,
      'Sign In': 'Sign In',
    }

    // Submit the request
    return request.post({
      url: options.base + options.signinPath,
      form: data,
      followAllRedirects: true,
    })
  })
}

// Build the module
module.exports = {

  /**
   * Reset a view
   */
  resetView: function (loginOptions, options) {
    return through.obj(function (file, encoding, callback) {
      login(loginOptions)
        .then(function ($) {
          // Load the Customize Theme page
          return request.get({
            url: options.base + options.customizeThemePath + 'revision/html/0',
          })
        }).then(function ($) {
          // Fetch the transient key and the current HTML
          var transientKey = $('#Form_TransientKey').val()
          var html = $('#Form_CustomHtml').val()

          // Submit the form
          return request.post({
            url: options.base + options.customizeThemePath,
            form: {
              'TransientKey': transientKey,
              'CustomHtml': html,
              'Label': options.message,
              'Apply': 'Apply',
            }
          })
        }).then(function ($) {
          // TODO
          // check for valid response or handle errors
        }).catch(function (error) {
          console.log(error)
        })
    })
  },

  /**
   * Update the view HTML with a custom file
   */
  updateView: function (loginOptions, options) {
    return through.obj(function (file, encoding, callback) {

      // Action options
      options = defaults(options, {
        customizeThemePath: '/settings/customtheme',
        message: 'Commit by vanilla-remote again'
      })

      // Execute a login
      login(loginOptions)
        .then(function ($) {
          // Load the Customize Theme page
          return request.get({
            url: options.base + options.customizeThemePath,
          })
        }).then(function ($) {
          // Fetch the transient key and the current HTML
          var transientKey = $('#Form_TransientKey').val()
          var html = $('#Form_CustomHtml').val()

          // Submit the form
          return request.post({
            url: options.base + options.customizeThemePath,
            form: {
              'TransientKey': transientKey,
              'CustomHtml': html,
              'Label': options.message,
              'Apply': 'Apply',
            }
          })
        }).then(function ($) {
          // TODO
          // check for valid response or handle errors
        }).catch(function (error) {
          console.log(error)
        })

      // Continue on
      callback()
    })
  }
}
