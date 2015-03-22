test:
	./test/bin/locales
	./node_modules/.bin/mocha test/specs/**/*.js

.PHONY: test
