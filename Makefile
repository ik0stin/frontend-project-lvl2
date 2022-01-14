install:
	npm ci

make lint:
	npx eslint .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest