test:
	./test/bin/locales
	./node_modules/.bin/mocha -R nyan test/specs/**/*.js

.PHONY: test
