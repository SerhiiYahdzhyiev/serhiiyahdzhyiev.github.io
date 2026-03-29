IMAGE     := website-dev
MODS_VOL  := website-dev-modules
ASTRO_VOL := website-dev-astro
DIST_VOL  := website-dev-dist

.DEFAULT_GOAL := help

.PHONY: help build-devcontainer dev preview prune-devcontainer

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  %-22s %s\n", $$1, $$2}'

build-devcontainer: ## Build the dev container image
	docker build -t $(IMAGE) .

dev: ## Start the Astro dev server at localhost:4321
	@docker image inspect $(IMAGE) > /dev/null 2>&1 || $(MAKE) build-devcontainer
	docker run --rm -it \
		--cap-drop=ALL \
		--security-opt=no-new-privileges:true \
		-v "$(CURDIR):/workspace:ro" \
		-v "$(MODS_VOL):/workspace/node_modules" \
		-v "$(ASTRO_VOL):/workspace/.astro" \
		-p 127.0.0.1:4321:4321 \
		$(IMAGE) \
		sh -c "npm ci && npm run dev -- --host"

preview: ## Build the site and serve it for preview/Lighthouse at localhost:4321
	@docker image inspect $(IMAGE) > /dev/null 2>&1 || $(MAKE) build-devcontainer
	docker run --rm -it \
		--cap-drop=ALL \
		--security-opt=no-new-privileges:true \
		-v "$(CURDIR):/workspace:ro" \
		-v "$(MODS_VOL):/workspace/node_modules" \
		-v "$(ASTRO_VOL):/workspace/.astro" \
		-v "$(DIST_VOL):/workspace/dist" \
		-p 127.0.0.1:4321:4321 \
		$(IMAGE) \
		sh -c "npm ci && npm run build && npm run preview -- --host"

prune-devcontainer: ## Remove the container image and all named volumes
	-docker rmi $(IMAGE)
	-docker volume rm $(MODS_VOL) $(ASTRO_VOL) $(DIST_VOL)
