import {
	ENEMY_HEALTH,
	MODIFIERS,
	ULT_RANKS,
	rollBack,
	type Modifier,
} from "../data/loadout";
import { executeThreshold } from "../lib/damage";

/** In game the health bar carries a minor tick every 100 HP and a major every 1000. */
const HP_PER_MINOR_TICK = 100;
const HP_PER_MAJOR_TICK = 1000;

/** Below this the ticks smear into a solid dark block, so the step widens. */
const MIN_TICK_PX = 2.5;

/**
 * How much health one minor tick should stand for. 100, as in game, unless the enemy
 * has so much health that 100-HP ticks would be packed tighter than they can be drawn.
 */
function hpPerMinorTick(enemyMaxHealth: number, barWidthPx: number): number {
	const steps = [HP_PER_MINOR_TICK, 250, 500, HP_PER_MAJOR_TICK, 2500];
	return (
		steps.find(
			(step) => (barWidthPx * step) / enemyMaxHealth >= MIN_TICK_PX,
		) ?? enemyMaxHealth
	);
}

export function initCalculator(): void {
	const healthInput = document.querySelector<HTMLInputElement>("#health");
	const result = document.querySelector<HTMLElement>("#result");
	const healthBar = document.querySelector<HTMLElement>(".hp-bar");
	const healthFill = document.querySelector<HTMLElement>(".hp-fill");
	const previously = document.querySelector<HTMLElement>("#previously");
	const resultPrevious = document.querySelector<HTMLElement>("#result-previous");
	const healthBarMax = document.querySelector<HTMLElement>("#hp-max");
	if (!healthInput || !result || !healthBar || !healthFill) return;

	const rankInputs = document.querySelectorAll<HTMLInputElement>(
		'input[name="ultRank"]',
	);

	// Kept in MODIFIERS order — executeThreshold sums bonuses in float order.
	const toggles = MODIFIERS.map((modifier) => ({
		modifier,
		input: document.getElementById(modifier.id) as HTMLInputElement | null,
	})).filter(
		(toggle): toggle is { modifier: Modifier; input: HTMLInputElement } =>
			toggle.input !== null,
	);

	const selectedRank = () => {
		const checked = document.querySelector<HTMLInputElement>(
			'input[name="ultRank"]:checked',
		);
		return ULT_RANKS.find((rank) => String(rank.rank) === checked?.value);
	};

	const update = () => {
		const enemyMaxHealth = Number.parseInt(healthInput.value, 10);
		const rank = selectedRank();

		// Leave the last good reading up rather than flashing a bogus one.
		if (!rank || !enemyMaxHealth || enemyMaxHealth < ENEMY_HEALTH.min) return;

		const selected = toggles
			.filter((toggle) => toggle.input.checked)
			.map((toggle) => toggle.modifier);

		const threshold = Math.floor(
			executeThreshold(rank, selected, enemyMaxHealth),
		);

		result.textContent = `${threshold} HP`;
		if (healthBarMax) healthBarMax.textContent = String(enemyMaxHealth);

		// A threshold can exceed max health (rank 3 with the lot, against a squishy),
		// which would otherwise overfill the bar past its frame.
		const share = Math.min(threshold / enemyMaxHealth, 1);
		healthFill.style.width = `${share * 100}%`;

		// Percentages, not pixels, so the ticks stay aligned if the bar is resized.
		const asPercent = (hp: number) => `${(hp / enemyMaxHealth) * 100}%`;
		const minorTick = hpPerMinorTick(enemyMaxHealth, healthBar.clientWidth);

		healthBar.style.setProperty("--tick-minor", asPercent(minorTick));
		healthBar.style.setProperty(
			"--tick-major",
			// A major tick below the minor step would sit between minor ticks and read
			// as noise; keep them coincident by snapping up to a multiple of the minor.
			asPercent(Math.max(HP_PER_MAJOR_TICK, minorTick)),
		);

		healthBar.setAttribute("aria-valuemax", String(enemyMaxHealth));
		healthBar.setAttribute("aria-valuenow", String(threshold));
		healthBar.setAttribute("aria-valuetext", `${threshold} of ${enemyMaxHealth} HP`);

		// The same reading, recomputed with every selected value rolled back to
		// what it was. Unchanged entries roll back to themselves, so if nothing
		// relevant moved this lands on the same number and the line stays hidden.
		if (previously && resultPrevious) {
			const previousThreshold = Math.floor(
				executeThreshold(
					rollBack(rank),
					selected.map(rollBack),
					enemyMaxHealth,
				),
			);

			previously.hidden = previousThreshold === threshold;
			resultPrevious.textContent = `${previousThreshold} HP`;
		}
	};

	healthInput.addEventListener("input", update);
	for (const rankInput of rankInputs) rankInput.addEventListener("change", update);
	for (const { input } of toggles) input.addEventListener("change", update);

	update();
}
