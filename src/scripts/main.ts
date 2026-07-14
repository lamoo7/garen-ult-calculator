import { initBackground } from "./background";
import { initCalculator } from "./calculator";

function boot(): void {
	initBackground();
	initCalculator();
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
	boot();
}
