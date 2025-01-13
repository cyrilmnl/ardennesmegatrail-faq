help:
	@grep -E '^\w+:.*?##\s.*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

init: ## Build and start
	@docker compose down -v
	@docker compose up -d --build
	@docker compose cp web:/app/public/. ./dist/
