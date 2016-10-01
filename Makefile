BIN=node_modules/.bin

test:
	./test/bin/locales
	$(BIN)/mocha ./test/specs/**/*.js

lint:
	$(BIN)/eslint ./src
	$(BIN)/eslint ./static
	$(BIN)/eslint ./test
	$(BIN)/eslint main.js

build:
	$(BIN)/handlebars src/views/ -f static/templates/views.js -e hbs -c handlebars
	$(BIN)/handlebars src/views/partials/ -f static/templates/partials.js -p -e hbs -c handlebars
	$(BIN)/spire-of-babel static/js/router.js --bundle --output static/js/main.min.js
	$(BIN)/node-sass static/css/styles.scss static/css/styles.css

coverage:
	$(BIN)/istanbul cover $(BIN)/_mocha ./test/specs/**/*.js

.PHONY: test coverage
