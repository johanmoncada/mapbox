export default {
    '/api/proxy': {
        "target": 'http://localhost:8080',
        "secure": false,
        "bypass": function (req, res, proxyOptions) {
            if (req.headers.accept.includes('html')) {
                console.log('Skipping proxy for browser request.');
                return '/index.html';
            }
            req.headers['X-Custom-Header'] = 'yes';
        }
    }
}