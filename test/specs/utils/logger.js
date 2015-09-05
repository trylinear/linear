require('with-env')();

var expect = require('chai').expect;

var logger = require('../../../src/utils/logger');

describe('logger util', function () {

    it('should log message', function () {

        logger.info('test');

    });

});
