var _ = require('lodash')

let getKeyValueQuery = (searchq) => {
	let searchItems = searchq.split(' ')
	let standardSearch = _.get(searchItems, '0')
	let standardSearchItems = ['is:question', 'user:', 'isaccepted:yes', 'isaccepted:no', 'is:question', 'is:answer', 'tag']
	let model, key, value, query;
	let foundItem = _.get(_.filter(standardSearchItems, (item) => _.startsWith(searchq, item) || (item == 'tag' && _.startsWith(searchItems[0], '[') && _.endsWith(searchItems[0], ']'))), '0')
    console.log("fountItem : ", foundItem)
	switch(foundItem) {
		case 'is:question':
            model = 'question'
			searchq = searchq.substring('is:question'.length).trim()
			key = 'title'
			value = searchq
            query = ''
            break;
		case 'user:':
            model = 'user'
			searchq = searchq.substring('user:'.length).trim()
			let searchqSplit = searchq.split(' ')
			key = 'name'
			value = searchqSplit.shift()
			query = searchqSplit.join(' ')
            break;
		case 'isaccepted:yes':
            model = 'question'
			searchq = searchq.substring('isaccepted:yes'.length).trim()
			key   = 'reviewStatus'
			value = 'approved',
            query = searchq
            break;
		case 'isaccepted:no':
            model = 'question'
			searchq = searchq.substring('isaccepted:no'.length).trim()
			key   = 'reviewStatus'
			value = 'rejected'
            query = searchq
            break;
		case 'is:answer':
            model = 'answer'
			searchq = searchq.substring('is:answer'.length).trim()
			key = 'answer'
			value = searchq
            break;
		case 'tag':
			console.log("==== tag : ")
			model = 'tag'
			key = 'name'
			value = searchq.substring(searchq.indexOf('[')+1, searchq.indexOf(']')-1).trim()
			query = searchq.substr(searchq.indexOf(']')+1)
			break;
		default:
            model = 'question'
			key = 'title'
			value = searchq
			query = undefined
            break;
	}
	return {model, key, value, query};
}

// let result = getKeyValueQuery('user:charan python cli error')
// let result = getKeyValueQuery('is:question python cli error')
// let result = getKeyValueQuery('is:answer python cli error')
// let result = getKeyValueQuery('python cli error')
let result = getKeyValueQuery('')
// let result = getKeyValueQuery('isaccepted:no python cli error')
// let result = getKeyValueQuery('[python3] How python cli error')
console.log("=== result : ", result)