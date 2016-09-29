BIN=node_modules/.bin

test:
	./test/bin/locales
	$(BIN)/mocha ./test/specs/**/*.js

lint:
	$(BIN)/eslint ./src
	$(BIN)/eslint ./test
	$(BIN)/eslint main.js

coverage:
	$(BIN)/jscover src src-cov
	mv src src-old
	mv src-cov src
	$(BIN)/mocha ./test/specs/**/*.js -R html-cov > coverage.html || exit 0;
	$(BIN)/mocha ./test/specs/**/*.js -R mocha-reporter-cov-summary || exit 0;
	rm -rf src
	mv src-old src

.PHONY: test
