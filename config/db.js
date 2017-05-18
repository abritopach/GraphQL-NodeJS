module.exports = {
    development: {
        secret: 'graphql',
        url: 'mongodb://localhost/graphql',
        app: {
            name: 'Graphql NodeJS'
        }
    },
    production: {
        secret: 'graphql',
        url: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
        app: {
            name: 'Graphql NodeJS'
        }
    }
}
