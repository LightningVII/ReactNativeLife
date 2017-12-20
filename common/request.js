'use strict'

import * as queryString from 'query-string'
import config from './config'

let request = {}

request.get = function (url, params) {
	if (params) {
		url += '?' + queryString.stringify(params)
	}

	return fetch(url)
		.then((response) => response.json())
}

request.post = function (url, body) {
	const options = {
		...config.header, ...{
			body: JSON.stringify(body)
		}
	}

	return fetch(url, options)
		.then((response) => response.json())
}

module.exports = request
