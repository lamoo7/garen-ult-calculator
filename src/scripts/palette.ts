import { getPaletteSync, type Color } from "colorthief";

const PALETTE_SIZE = 5;

/** Distance between the strongest and weakest channel — a cheap stand-in for saturation. */
const vibrance = (colour: Color): number => {
	const [red, green, blue] = colour.array();
	return Math.max(red, green, blue) - Math.min(red, green, blue);
};

/**
 * Re-themes the page around the most vibrant colour in `image`, so the accent
 * follows whichever skin is on screen. No-op if the image is cross-origin or
 * yields no palette.
 */
export function applyAccentFrom(image: HTMLImageElement): void {
	const apply = () => {
		try {
			const palette = getPaletteSync(image, { colorCount: PALETTE_SIZE });
			if (!palette) return;
			const accent = palette.reduce((best, colour) =>
				vibrance(colour) > vibrance(best) ? colour : best,
			);
			document.documentElement.style.setProperty(
				"--color-primary",
				accent.hex(),
			);
		} catch (error) {
			console.error("Color extraction failed:", error);
		}
	};

	if (image.complete) apply();
	else image.addEventListener("load", apply, { once: true });
}
