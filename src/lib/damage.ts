import type { Modifier, UltRank } from "../data/loadout";

/**
 * The Collector executes a target that is *below* the threshold, not at it, so
 * the reported number is pulled 1 HP under the line to stay in executable range.
 */
const STRICTLY_BELOW = 1;

/**
 * The enemy health at which Garen's ult becomes lethal.
 *
 * The ult deals `base + missing health %`, so its damage grows as the target
 * drops, the kill threshold is the fixed point where damage meets remaining
 * health. Solving `damage(hp) >= hp` for the threshold `t` (with `m` the
 * missing-health share, `d` the damage multiplier, `e` The Collector's execute
 * share of max health) gives:
 *
 *     t = (base * d + (m * d + e) * maxHealth) / (1 + m * d)
 *
 * `modifiers` must be in {@link MODIFIERS} order: the bonuses are summed as
 * floats, so reordering them can shift the result by a fraction of an HP.
 */
export function executeThreshold(
	rank: UltRank,
	modifiers: readonly Modifier[],
	enemyMaxHealth: number,
): number {
	const damageMultiplier = modifiers.reduce(
		(total, modifier) => total + (modifier.bonusPercent ?? 0) / 100,
		1,
	);
	const executeShare = modifiers.reduce(
		(total, modifier) => total + (modifier.executePercent ?? 0) / 100,
		0,
	);

	const missingHealthScaling =
		(rank.missingHealthPercent / 100) * damageMultiplier;

	const threshold =
		(rank.base * damageMultiplier +
			(missingHealthScaling + executeShare) * enemyMaxHealth) /
		(1 + missingHealthScaling);

	return executeShare > 0 ? threshold - STRICTLY_BELOW : threshold;
}
