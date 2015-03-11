var IPADDRESS = [
    process.env.BIND_IP,
    process.env.OPENSHIFT_NODEJS_IP,
    '127.0.0.1'
];

var MONGODB = [
    process.env.MONGOLAB_URI,
    process.env.MONGOHQ_URL,
    process.env.OPENSHIFT_MONGODB_DB_URL,
    'mongodb://localhost/linear'
];

var PORT = [
    process.env.PORT,
    process.env.OPENSHIFT_NODEJS_PORT,
    5000
];

module.exports = {

    ipaddress: function () {

        return IPADDRESS.filter(function (value) { return value; })[0];

    },

    mongodb: function () {

        return MONGODB.filter(function (value) { return value; })[0];

    },

    port: function () {

        return PORT.filter(function (value) { return value; })[0];

    }

};
