import type { ImageMetadata } from "astro";

import OriginalCircle from "../assets/circles/Garen_OriginalCircle.webp";
import SteelLegionCircle from "../assets/circles/Garen_SteelLegionCircle.webp";
import WarringKingdomsCircle from "../assets/circles/Garen_WarringKingdomsCircle.webp";
import GodKingCircle from "../assets/circles/Garen_God-KingCircle.webp";
import DemaciaViceCircle from "../assets/circles/Garen_DemaciaViceCircle.webp";
import MechaKingdomsCircle from "../assets/circles/Garen_MechaKingdomsCircle.webp";
import PrestigeMechaCircle from "../assets/circles/Garen_PrestigeMechaKingdomsCircle.webp";
import BattleAcademiaCircle from "../assets/circles/Garen_BattleAcademiaCircle.webp";
import MythmakerCircle from "../assets/circles/Garen_MythmakerCircle.webp";
import FallenGodKingCircle from "../assets/circles/Garen_FallenGod-KingCircle.webp";
import VisionsCircle from "../assets/circles/Garen_VisionsoftheFallenCircle.png";

import OriginalBg from "../assets/background/Garen.jpg";
import SteelLegionBg from "../assets/background/Garen_Steel-LegionSkin.jpg";
import WarringKingdomsBg from "../assets/background/Garen_Warring-KingdomsSkin.jpg";
import GodKingBg from "../assets/background/Garen_God-KingSkin.jpg";
import DemaciaViceBg from "../assets/background/Garen_Demacia-ViceSkin.jpg";
import MechaKingdomsBg from "../assets/background/Garen_Mecha-KingdomsSkin.jpg";
import PrestigeMechaBg from "../assets/background/Garen_Mecha-Kingdoms-PrestigeSkin.jpg";
import BattleAcademiaBg from "../assets/background/Garen_Battle-AcademiaSkin.jpg";
import MythmakerBg from "../assets/background/Garen_MythmakerSkin.jpg";
import FallenGodKingBg from "../assets/background/Garen_FallenGod-KingSkin.jpg";
import VisionsBg from "../assets/background/Garen_VisionsoftheFallenSkin.jpg";

export interface Skin {
	id: string;
	name: string;
	circle: ImageMetadata;
	background: ImageMetadata;
	/**
	 * The background filename this skin used to be keyed by. Saved skin
	 * preferences from before ids existed still hold this value, so it is
	 * matched on read to migrate them. Safe to drop once no one is on an
	 * old save.
	 */
	legacyKey: string;
}

export const SKINS: Skin[] = [
	{
		id: "original",
		name: "Default",
		circle: OriginalCircle,
		background: OriginalBg,
		legacyKey: "Garen.jpg",
	},
	{
		id: "steel-legion",
		name: "Steel Legion",
		circle: SteelLegionCircle,
		background: SteelLegionBg,
		legacyKey: "Garen_Steel-LegionSkin.jpg",
	},
	{
		id: "warring-kingdoms",
		name: "Warring Kingdoms",
		circle: WarringKingdomsCircle,
		background: WarringKingdomsBg,
		legacyKey: "Garen_Warring-KingdomsSkin.jpg",
	},
	{
		id: "god-king",
		name: "God King",
		circle: GodKingCircle,
		background: GodKingBg,
		legacyKey: "Garen_God-KingSkin.jpg",
	},
	{
		id: "demacia-vice",
		name: "Demacia Vice",
		circle: DemaciaViceCircle,
		background: DemaciaViceBg,
		legacyKey: "Garen_Demacia-ViceSkin.jpg",
	},
	{
		id: "mecha-kingdoms",
		name: "Mecha Kingdoms",
		circle: MechaKingdomsCircle,
		background: MechaKingdomsBg,
		legacyKey: "Garen_Mecha-KingdomsSkin.jpg",
	},
	{
		id: "mecha-kingdoms-prestige",
		name: "Mecha Kingdoms Prestige",
		circle: PrestigeMechaCircle,
		background: PrestigeMechaBg,
		legacyKey: "Garen_Mecha-Kingdoms-PrestigeSkin.jpg",
	},
	{
		id: "battle-academia",
		name: "Battle Academia",
		circle: BattleAcademiaCircle,
		background: BattleAcademiaBg,
		legacyKey: "Garen_Battle-AcademiaSkin.jpg",
	},
	{
		id: "mythmaker",
		name: "Mythmaker",
		circle: MythmakerCircle,
		background: MythmakerBg,
		legacyKey: "Garen_MythmakerSkin.jpg",
	},
	{
		id: "fallen-god-king",
		name: "Fallen God King",
		circle: FallenGodKingCircle,
		background: FallenGodKingBg,
		legacyKey: "Garen_FallenGod-KingSkin.jpg",
	},
	{
		id: "visions-of-the-fallen",
		name: "Visions of the Fallen",
		circle: VisionsCircle,
		background: VisionsBg,
		legacyKey: "Garen_VisionsoftheFallenSkin.jpg",
	},
];

export const DEFAULT_SKIN = SKINS[0]!;

/** Matches an id, or a filename saved before skins had ids. */
export function findSkin(key: string | null): Skin | undefined {
	if (!key) return undefined;
	return SKINS.find((skin) => skin.id === key || skin.legacyKey === key);
}
