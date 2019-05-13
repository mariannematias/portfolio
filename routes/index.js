const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const controllers = require('../controllers')
const CDN = (process.env.TURBO_ENV=='dev') ? null : process.env.CDN

router.get('/', (req, res) => {
	const data = {cdn: CDN}

	turbo.pageConfig('home', process.env.TURBO_API_KEY, process.env.TURBO_ENV)
	.then(homeConfig => {
		data['page'] = homeConfig
		const jobCtr = new controllers.job()
		return jobCtr.get()
	})
	.then(jobs => {
		data['jobs'] = jobs
		const schoolCtr = new controllers.school()
		return schoolCtr.get()
	})
	.then(schools => {
		data['schools'] = schools
		const postsCtr = new controllers.post()
		return postsCtr.get({limit:3})
	})
	.then(posts => {
		data['posts'] = posts
		return turbo.currentApp(process.env.TURBO_ENV)
	})
	.then(site => {
		data['site'] = site
		data['global'] = site.globalConfig
		data['preloaded'] = JSON.stringify({
			page: data.page,
			global: data.global
		})

		res.render('home', data)
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/blog', (req, res) => {
	const data = {cdn: CDN}
	res.render('blog', data)
})

router.get('/post/:slug', (req, res) => {
	const data = {cdn: CDN}
	res.render('blog', data)
})

module.exports = router
