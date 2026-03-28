IMAGE     := website-dev
MODS_VOL  := website-dev-modules
ASTRO_VOL := website-dev-astro

.PHONY: build-devcontainer dev prune-devcontainer

build-devcontainer:
	docker build -t $(IMAGE) .

dev:
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

prune-devcontainer:
	-docker rmi $(IMAGE)
	-docker volume rm $(MODS_VOL) $(ASTRO_VOL)
