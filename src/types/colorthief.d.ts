declare module "colorthief/dist/color-thief.mjs" {
	export type Rgb = [red: number, green: number, blue: number];

	export default class ColorThief {
		getColor(image: HTMLImageElement, quality?: number): Rgb;
		getPalette(
			image: HTMLImageElement,
			colorCount?: number,
			quality?: number,
		): Rgb[];
	}
}
