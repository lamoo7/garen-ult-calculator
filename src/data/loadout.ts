import type { ImageMetadata } from "astro";

import ultImg from "../assets/img/ult.webp";
import collectorImg from "../assets/img/collector.webp";
import spearImg from "../assets/img/spear.webp";
import ldrImg from "../assets/img/ldr.webp";
import axiomImg from "../assets/img/axiom.webp";
import ptaImg from "../assets/img/pta.webp";
import lastImg from "../assets/img/last.webp";

// ===========================================================================
//  THE NUMBERS. This is the only file you need to touch to retune the app.
//  The checkboxes, the tooltips and the maths are all generated from these.
// ===========================================================================

// Any entry below can carry a `previous: { ... }` block holding the values it
// had before the last change. List only the fields that actually moved; the
// page then also shows the execute threshold you *used* to get. Nerf or buff,
// it doesn't care. Delete the block when it stops being interesting.
//
//     { rank: 3, base: 320, missingHealthPercent: 35, pips: "•••",
//       previous: { base: 350 } },
//
//     { id: "spear_of_shojin", ..., bonusPercent: 12,
//       previous: { bonusPercent: 15 } },

/** Ult damage: `base` flat, plus `missingHealthPercent` of the health the enemy is missing. */
export const ULT_RANKS: UltRank[] = [
	{ rank: 1, base: 125, missingHealthPercent: 25, pips: "•", previous: { base: 150 } },
	{ rank: 2, base: 200, missingHealthPercent: 30, pips: "••", previous: { base: 250 } },
	{ rank: 3, base: 275, missingHealthPercent: 35, pips: "•••", previous: { base: 350 } },
];

/** Items and runes, in the order they appear on the page. `short` is the caption
    printed under the icon, so keep it to a word or two or the row gets ragged. */
export const MODIFIERS: Modifier[] = [
	{ id: "collector",             name: "The Collector",          short: "Collector",      image: collectorImg, executePercent: 5 },
	{ id: "spear_of_shojin",       name: "Spear of Shojin",        short: "Shojin",         image: spearImg,     bonusPercent: 12 },
	{ id: "lord_dominiks_regards", name: "Lord Dominik's Regards", short: "LDR",            image: ldrImg,       bonusPercent: 15 },
	{ id: "axiom_arcanist",        name: "Axiom Arc",              short: "Axiom Arcanist", image: axiomImg,     bonusPercent: 12 },
	{ id: "press_the_attack",      name: "Press the Attack",       short: "PTA",            image: ptaImg,       bonusPercent: 8 },
	{ id: "last_stand",            name: "Last Stand",             short: "Last Stand",     image: lastImg,      bonusPercent: 11 },
];

/** Accepted range of the enemy-HP input. */
export const ENEMY_HEALTH = { min: 500, max: 10000 };

// ===========================================================================
//  Plumbing. No tuning numbers below this line.
// ===========================================================================

/** Demacian Justice. Shared by all three ranks. */
export const ULT_ICON: ImageMetadata = ultImg;

export interface UltRank {
	rank: 1 | 2 | 3;
	base: number;
	missingHealthPercent: number;
	/** Rank pips drawn above the icon. */
	pips: string;
	/** The values this rank had before the last change. Omitted fields are unchanged. */
	previous?: Pick<Partial<UltRank>, "base" | "missingHealthPercent">;
}

/**
 * An entry as it stood before the last change. Entries with no `previous` block
 * come back untouched, so this is always safe to map over a whole loadout.
 */
export const rollBack = <T extends { previous?: object }>(entry: T): T =>
	entry.previous ? { ...entry, ...entry.previous } : entry;

export interface Modifier {
	/** Doubles as the DOM id of its checkbox. */
	id: string;
	name: string;
	/** Caption under the icon. */
	short: string;
	image: ImageMetadata;
	/** Additive increase to ult damage, in percent. */
	bonusPercent?: number;
	/** Percent of max HP below which the target is executed outright. Collector only. */
	executePercent?: number;
	/** The values this modifier had before the last change. Omitted fields are unchanged. */
	previous?: Pick<Partial<Modifier>, "bonusPercent" | "executePercent">;
}

// What each icon is worth, printed underneath it. There are no tooltips, so these
// captions are the only place the numbers appear — they read straight off the data
// above, so they can't drift out of step with the maths.

/** e.g. "125 dmg" / "+25% missing". */
export const rankEffect = (rank: UltRank): [string, string] => [
	`${rank.base} base`,
	`+${rank.missingHealthPercent}% missing`,
];

export const modifierEffect = (modifier: Modifier): string =>
	modifier.executePercent
		? `exec ${modifier.executePercent}%`
		: `+${modifier.bonusPercent}%`;
