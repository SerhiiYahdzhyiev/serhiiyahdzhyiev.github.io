IMAGE      := website-dev
DEPS_IMAGE := website-dev:deps
MODS_VOL   := website-dev-modules
ASTRO_VOL  := website-dev-astro
DIST_VOL   := website-dev-dist

.DEFAULT_GOAL := help

.PHONY: help build-devcontainer deps dev preview prune-devcontainer

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  %-22s %s\n", $$1, $$2}'

build-devcontainer: ## Build the dev container image
	docker build -f Dockerfile.dev -t $(IMAGE) .

deps: ## Launch an isolated shell for dependency management (prevents supply-chain leakage)
	docker build -f Dockerfile.dev --target deps -t $(DEPS_IMAGE) .
	docker run --rm -it \
		--cap-drop=ALL \
		--security-opt=no-new-privileges:true \
		$(DEPS_IMAGE) \
		sh

dev: ## Start the Astro dev server at localhost:4321
	@docker image inspect $(IMAGE) > /dev/null 2>&1 || $(MAKE) build-devcontainer
	docker run --rm -d \
		--name website-dev \
		--cap-drop=ALL \
		--security-opt=no-new-privileges:true \
		-v "$(CURDIR):/workspace" \
		-v "$(MODS_VOL):/workspace/node_modules" \
		-v "$(ASTRO_VOL):/workspace/.astro" \
		-p 127.0.0.1:4321:4321 \
		$(IMAGE) \
		sh -c "npm run dev -- --host"

preview: ## Build the site and serve it for preview at localhost:4321
	@docker image inspect $(IMAGE) > /dev/null 2>&1 || $(MAKE) build-devcontainer
	docker run --rm -d \
		--name website-preview \
		--cap-drop=ALL \
		--security-opt=no-new-privileges:true \
		-v "$(CURDIR):/workspace" \
		-v "$(MODS_VOL):/workspace/node_modules" \
		-v "$(ASTRO_VOL):/workspace/.astro" \
		-v "$(DIST_VOL):/workspace/dist" \
		-p 127.0.0.1:4321:4321 \
		$(IMAGE) \
		sh -c "npm run build && npm run preview -- --host"

prune-devcontainer: ## Remove the container image and all named volumes
	-docker rmi $(IMAGE)
	-docker volume rm $(MODS_VOL) $(ASTRO_VOL) $(DIST_VOL)
