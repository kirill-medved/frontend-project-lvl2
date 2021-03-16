install: install-deps

run: bin/nodejs-package.js 10

install-deps: npm ci

lint: eslint .

test: npm test

test-coverage: npm test -- --coverage --coverageProvider=v8
