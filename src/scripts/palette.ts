import ColorThief, { type Rgb } from "colorthief/dist/color-thief.mjs";

const PALETTE_SIZE = 5;

/** Distance between the strongest and weakest channel — a cheap stand-in for saturation. */
const vibrance = ([red, green, blue]: Rgb): number =>
	Math.max(red, green, blue) - Math.min(red, green, blue);

const toHex = (rgb: Rgb): string =>
	`#${rgb.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;

/**
 * Re-themes the page around the most vibrant colour in `image`, so the accent
 * follows whichever skin is on screen. No-op if the image is cross-origin or
 * yields no palette.
 */
export function applyAccentFrom(image: HTMLImageElement): void {
	const apply = () => {
		try {
			const palette = new ColorThief().getPalette(image, PALETTE_SIZE);
			const accent = palette.reduce((best, colour) =>
				vibrance(colour) > vibrance(best) ? colour : best,
			);
			document.documentElement.style.setProperty(
				"--color-primary",
				toHex(accent),
			);
		} catch (error) {
			console.error("Color extraction failed:", error);
		}
	};

	if (image.complete) apply();
	else image.addEventListener("load", apply, { once: true });
}
