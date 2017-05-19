const databaseConfig = {
    development: {
        url: 'mongodb://localhost/graphql',
    },
    production: {
        url: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
    }
}

const serverConfig = {
    port: 3000
}

export { databaseConfig, serverConfig }