const IPADDRESS = [
    process.env.BIND_IP,
    process.env.OPENSHIFT_NODEJS_IP,
    '0.0.0.0'
];

const MONGODB = [
    process.env.MONGODB_URI,
    process.env.MONGOLAB_URI,
    process.env.MONGOHQ_URL,
    process.env.OPENSHIFT_MONGODB_DB_URL,
    'mongodb://localhost/linear'
];

const PORT = [
    process.env.PORT,
    process.env.OPENSHIFT_NODEJS_PORT,
    '8080'
];

module.exports = {

    ipaddress () {

        return IPADDRESS.filter(value => value)[0];

    },

    mongodb () {

        return MONGODB.filter(value => value)[0];

    },

    port () {

        return PORT.filter(value => value)[0];

    }

};
