import { DEFAULT_SKIN, findSkin } from "../data/skins";
import { applyAccentFrom } from "./palette";

const STORAGE_KEY = "selectedBackground";

/** Must stay in step with the opacity transition on the background layers. */
const FADE_MS = 200;

/** Every skin is rendered as a stacked layer; only the z-order and opacity move. */
const LAYER_HIDDEN = "-3";
const LAYER_CURRENT = "-2";
const LAYER_INCOMING = "-1";

function readSavedSkinId(): string {
	try {
		return (findSkin(localStorage.getItem(STORAGE_KEY)) ?? DEFAULT_SKIN).id;
	} catch {
		// Storage can be unavailable (private mode, blocked cookies).
		return DEFAULT_SKIN.id;
	}
}

function saveSkinId(id: string): void {
	try {
		localStorage.setItem(STORAGE_KEY, id);
	} catch {
		// Preference simply won't persist.
	}
}

export function initBackground(): void {
	const layers = Array.from(
		document.querySelectorAll<HTMLImageElement>("#bg-preload img[data-skin-id]"),
	);
	const circles = document.querySelectorAll<HTMLElement>(
		"#background-change .skin-circle",
	);
	if (layers.length === 0) return;

	const layerFor = (id: string) =>
		layers.find((layer) => layer.dataset.skinId === id);

	let currentId = readSavedSkinId();
	let isTransitioning = false;

	/** Lights up the circle whose skin is on screen. */
	const markActive = (id: string) => {
		for (const circle of circles) {
			const isActive = circle.dataset.skinId === id;
			circle.classList.toggle("is-active", isActive);
			circle.setAttribute("aria-pressed", String(isActive));
		}
	};

	// The markup shows the default skin; swap to the saved one before first paint.
	for (const layer of layers) {
		const isCurrent = layer.dataset.skinId === currentId;
		layer.style.opacity = isCurrent ? "1" : "0";
		layer.style.zIndex = isCurrent ? LAYER_CURRENT : LAYER_HIDDEN;
		if (isCurrent) applyAccentFrom(layer);
	}
	markActive(currentId);

	const select = (circle: HTMLElement) => {
		const id = circle.dataset.skinId;
		if (isTransitioning || !id || id === currentId) return;

		const incoming = layerFor(id);
		if (!incoming) return;

		isTransitioning = true;
		const outgoing = layerFor(currentId);

		// Stage the incoming layer above the current one, still transparent...
		incoming.style.zIndex = LAYER_INCOMING;
		incoming.style.opacity = "0";

		// ...then let the browser paint that state before starting the fade,
		// otherwise the opacity change is coalesced and nothing animates.
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				incoming.style.opacity = "1";

				window.setTimeout(() => {
					if (outgoing) {
						outgoing.style.zIndex = LAYER_HIDDEN;
						outgoing.style.opacity = "0";
					}
					incoming.style.zIndex = LAYER_CURRENT;

					currentId = id;
					saveSkinId(id);
					applyAccentFrom(incoming);
					markActive(id);
					isTransitioning = false;
				}, FADE_MS);
			});
		});
	};

	for (const circle of circles) {
		circle.addEventListener("click", () => select(circle));

		// The circles are images, not buttons, so they need their own key handling.
		circle.addEventListener("keydown", (event) => {
			if (event.key !== "Enter" && event.key !== " ") return;
			event.preventDefault();
			select(circle);
		});
	}
}
