ROOT:=$(shell pwd)

.PHONY: build/express
build/express: SHELL=bash
build/express:
	@cd express-app; \
	rm -rf node_modules; \
	exec npm install

.PHONY: run/express
run/express: SHELL=bash
run/express:
	@cd express-app; \
	exec npm run dev

.PHONY: run/fix
run/fix: SHELL=bash
run/fix:
	@cd express-app; \
	exec npm run lint

.PHONY: run/postgres
run/postgres: SHELL=bash
run/postgres:
	 exec docker-compose --file docker-compose.dev.yml up postgres

.PHONY: run/pgadmin
run/pgadmin: SHELL=bash
run/pgadmin:
	 exec docker-compose --file docker-compose.dev.yml up pgadmin