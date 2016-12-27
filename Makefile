BIN=node_modules/.bin

test:
	bash test/bin/locales
	make lint
	$(BIN)/mocha 'test/specs/**/*.js'

lint:
	$(BIN)/eslint src/
	$(BIN)/eslint static/
	$(BIN)/eslint test/
	$(BIN)/eslint main.js

coverage:
	$(BIN)/istanbul cover $(BIN)/_mocha 'test/specs/**/*.js'

clean:
	mongoimport -d linear -c posts --drop --file data/posts.json
	mongoimport -d linear -c profiles --drop --file data/profiles.json

.PHONY: test coverage
