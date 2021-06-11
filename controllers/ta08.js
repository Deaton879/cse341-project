// Controller for Week 8 prove assignment
const https = require('https')

const ITEM_LIMIT = 10 

const renderIndex = (req, res, json) => {
    let searchedValue = req.body.searchValue || req.query.searchValue || '' 
    let page = req.query.page || 1 

    const indexStart = (page - 1) * ITEM_LIMIT
    const indexEnd = page * ITEM_LIMIT

    const filteredData = global.jsonResponse.filter(x =>
        x.name.toLowerCase().includes(searchedValue.toLowerCase())
    )

    let stuff = {
        data: filteredData.slice(indexStart, indexEnd), 
        path: 'proveAssignments/08',
        title: 'Week 8 Prove Assignment',
        searchedValue: searchedValue,
        page: page,
        firstPage: 1,
        lastPage: indexEnd,
        hasPreviousPage: page > 1,
        nextPage: parseInt(page) + 1,
        previousPage: page - 1,
        numPages: Math.ceil(filteredData.length / ITEM_LIMIT),
        hasNextPage: page < indexEnd
    }

    res.render('pages/provePages/prove08.ejs', stuff)
}

exports.processJson = (req, res, next) => {
    
    var url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json'

    https
        .get(url, function (response) {
            var body = ''

            response.on('data', function (chunk) {
                body += chunk
            })

            response.on('end', function () {
                global.jsonResponse = JSON.parse(body)
                renderIndex(req, res, global.jsonResponse)
            })
        })
        .on('error', function (e) {
            console.log('Got an error: ', e)
        })
}


exports.getIndex = (req, res, next) => {
    renderIndex(req, res, global.jsonResponse) 
}