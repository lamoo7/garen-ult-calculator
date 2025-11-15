# ⚔️ Garen Ultimate Calculator

A sleek, interactive calculator for League of Legends' Garen ultimate ability (Demacian Justice). Calculate execute thresholds based on ultimate rank, items, runes, and enemy health.

🔗 **Live Demo**: [https://lamoo7.github.io/garen-ult-calculator](https://lamoo7.github.io/garen-ult-calculator)

## ✨ Features

- **Dynamic Background Selection**: Choose from 11 Garen skins with smooth transitions
- **Smart Color Theming**: Automatically extracts and applies the most vibrant color from each skin
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Real-time Calculations**: Auto-updates as you change inputs
- **Image Optimization**: All images optimized using Astro's built-in image processing
- **Persistent Settings**: Your selected skin is saved across sessions

## 🎮 Supported Items & Runes

### Items
- **Collector**: Adds 5% max HP damage
- **Spear of Shojin**: +12% damage
- **Axiom Arc**: +12% damage

### Runes
- **Press the Attack**: +8% damage
- **Last Stand**: +11% damage

## 🛠️ Built With

- **[Astro](https://astro.build)** - Static site generator
- **[ColorThief](https://github.com/lokesh/color-thief)** - Dominant color extraction
- **TypeScript** - Type safety
- **CSS Variables** - Dynamic theming

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/lamoo7/garen-ult-calculator.git
cd garen-ult-calculator
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

## 📦 Commands

| Command | Action |
|---------|--------|
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview your build locally |

## 🎨 Features in Detail

### Background Transitions
- Smooth crossfade animations using optimized image layers
- 11 unique Garen skin backgrounds
- Responsive image loading for all screen sizes

### Color Extraction
- Automatically extracts the most vibrant color from each background
- Applies color to borders, inputs, and UI accents
- Smooth color transitions matching background changes

### Calculator Logic
- Accurate damage calculations based on official League of Legends formulas
- Supports all rank levels (1, 2, 3)
- Multiplicative bonus stacking for items and runes
- Visual progress bar showing execute threshold

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Riot Games for League of Legends
- Garen skin artwork from League of Legends
- Built with assistance from GitHub Copilot

---

**For Justice!** ⚔️✨
