const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/age-check', function (req, res) {
  res.render('age-check')
})

router.post('/age-check', function (req, res) {
  const answer = req.session.data['age-check']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'age-check': 'Select yes if you are 65 or older.' }
    return res.render('age-check')
  }
  if (answer === 'yes') {
    return res.redirect('/mobility-check')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-age-check')
  }
  res.redirect('/mobility-check')
})

router.get('/ineligible-age-check', function (req, res) {
  res.render('ineligible-age-check')
})

router.get('/mobility-check', function (req, res) {
  res.render('mobility-check')
})

router.post('/mobility-check', function (req, res) {
  const answer = req.session.data['mobility-check']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'mobility-check': 'Select the option that best describes your situation.' }
    return res.render('mobility-check')
  }
  if (answer === 'yes') {
    return res.redirect('/lives-alone')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-mobility-check')
  }
  res.redirect('/lives-alone')
})

router.get('/ineligible-mobility-check', function (req, res) {
  res.render('ineligible-mobility-check')
})

router.get('/lives-alone', function (req, res) {
  res.render('lives-alone')
})

router.post('/lives-alone', function (req, res) {
  const answer = req.session.data['lives-alone']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'lives-alone': 'Select the option that best describes your situation.' }
    return res.render('lives-alone')
  }
  if (answer === 'no-support') {
    return res.redirect('/full-name')
  } else if (answer === 'sometimes') {
    return res.redirect('/full-name')
  } else if (answer === 'yes-support') {
    return res.redirect('/ineligible-lives-alone')
  }
  res.redirect('/full-name')
})

router.get('/ineligible-lives-alone', function (req, res) {
  res.render('ineligible-lives-alone')
})

router.get('/full-name', function (req, res) {
  res.render('full-name')
})

router.post('/full-name', function (req, res) {
  const answer = req.session.data['full-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'full-name': 'Enter your full name.' }
    return res.render('full-name')
  }
  res.redirect('/dietary-needs')
})

router.get('/dietary-needs', function (req, res) {
  res.render('dietary-needs')
})

router.post('/dietary-needs', function (req, res) {
  const answer = req.session.data['dietary-needs']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'dietary-needs': 'Tell us about your dietary needs, or write \'none\' if you have no dietary needs.' }
    return res.render('dietary-needs')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('FD')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
