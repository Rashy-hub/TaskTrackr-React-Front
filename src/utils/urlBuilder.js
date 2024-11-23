const urlBuilder = ({ baseURL, endpoint, params, queries }) => {
    const fullURL = `${baseURL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`
    console.log('HERE INSIDE ' + fullURL.toString())
    let url = new URL(fullURL)

    // let endUrl = resolve(url, endpoint)
    if (params && typeof params === 'object') {
        Object.keys(params).forEach((key) => {
            url.pathname = url.pathname.replace(`:${key}`, params[key])
        })
    }

    if (queries && typeof queries === 'object') {
        Object.keys(queries).forEach((key) => {
            url.searchParams.append(key, queries[key])
        })
    }

    return url.toString()
}

export default urlBuilder
