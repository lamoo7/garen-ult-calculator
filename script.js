document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const root = document.documentElement;
    const progressElement = document.querySelector('progress');
    const ranks = document.querySelectorAll('.rank input');
    const slider = document.querySelector('input[type="range"]');
    const numberInput = document.querySelector('input[type="number"]');
    const modifiers = document.querySelectorAll('input[type="checkbox"]');
    const button = document.querySelector('button');
    const result = document.querySelector('p span');
    const dialog = document.getElementById("modal");
    const btn = document.getElementById("info");
    const span = document.querySelector(".close");
    const backgroundChangeDiv = document.getElementById('background-change');
    const images = backgroundChangeDiv.querySelectorAll('img');
    const specialBackgrounds = [
        'Garen_Steel-LegionSkin.jpg',
        'Garen_God-KingSkin.jpg', 
        'Garen_Demacia-ViceSkin.jpg', 
        'Garen_Mecha-KingdomsSkin.jpg'
    ];

    // Functions
    const preloadImages = () => {
        const imgList = [
            'img/Garen.jpg', 
            'img/Garen_Steel-LegionSkin.jpg', 
            'img/Garen_Warring-KingdomsSkin.jpg', 
            'img/Garen_God-KingSkin.jpg', 
            'img/Garen_Demacia-ViceSkin.jpg', 
            'img/Garen_Mecha-KingdomsSkin.jpg', 
            'img/Garen_Mecha-Kingdoms-PrestigeSkin.jpg', 
            'img/Garen_Battle-AcademiaSkin.jpg', 
            'img/Garen_MythmakerSkin.jpg'
        ];
        imgList.forEach(imageUrl => {
            const img = new Image();
            img.src = imageUrl;
        });
    };

    const fadeBackground = (bgUrl, manualChange = false) => {
        const body = document.body;
        if (!manualChange) {
            body.style.backgroundImage = `url(${bgUrl})`;
        } else {
            body.style.opacity = '0';
            setTimeout(() => {
                body.style.backgroundImage = `url(${bgUrl})`;
            }, 500);
            setTimeout(() => {
                body.style.opacity = '1';
            }, 1150);
        }
    };

    const changeContainerBackgroundColor = (bgUrl) => {
        if (specialBackgrounds.includes(bgUrl.split('/').pop())) {
            root.style.setProperty('--color', '#7da8ad');
            root.style.setProperty('--accent', '#28378d');
            root.style.setProperty('--alpha-color', '#7da8ad9d');
        } else {
            root.style.setProperty('--color', '');
            root.style.setProperty('--accent', '');
            root.style.setProperty('--alpha-color', '');
        }
    };

    const calculateDamage = (maxHP, baseDmg, missingHpPerc) => {
        const threshold = Math.floor((100 * baseDmg + missingHpPerc * maxHP) / (100 + missingHpPerc));
        return Math.min(threshold, maxHP);
    };

    // Event Listeners
    btn.onclick = () => dialog.showModal();
    span.onclick = () => dialog.close();
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    images.forEach(image => {
        image.addEventListener('click', function () {
            const bgUrl = this.dataset.bgUrl;
            fadeBackground(bgUrl, true);
            changeContainerBackgroundColor(bgUrl);
            localStorage.setItem('chosenBackground', bgUrl); // Save chosen background to localStorage
        });
    });

    ranks[0].checked = true;
    ranks.forEach(rank => {
        rank.addEventListener('change', function () {
            ranks.forEach(rank => {
                rank.parentNode.querySelector('.fa-check').style.display = 'none';
            });
            if (this.checked) {
                this.parentNode.querySelector('.fa-check').style.display = 'inline-block';
            }
        });
    });

    slider.addEventListener('input', () => numberInput.value = slider.value);
    numberInput.addEventListener('input', () => slider.value = numberInput.value);

    button.addEventListener('click', () => {
        const maxHP = parseInt(slider.value);
        const selectedRank = document.querySelector('input[name="rank"]:checked').value;
        let baseDamage = 0;
        let missingHealthPercent = 0;
        if (selectedRank === "1") {
            baseDamage = 150;
            missingHealthPercent = 25;
        } else if (selectedRank === "2") {
            baseDamage = 300;
            missingHealthPercent = 30;
        } else if (selectedRank === "3") {
            baseDamage = 450;
            missingHealthPercent = 35;
        }
        const collectorSelected = document.querySelector('input[value="0"]').checked;
        let totalDamage = calculateDamage(maxHP, baseDamage, missingHealthPercent);
        modifiers.forEach(modifier => {
            if (modifier.checked) {
                const modifierValue = parseInt(modifier.value);
                totalDamage *= (100 + modifierValue) / 100;
            }
        });
        let CollectorDamage = totalDamage + (maxHP * 0.05) - 1;
        if (collectorSelected) {
            result.textContent = CollectorDamage.toFixed(0) + " HP";
            progressElement.value = CollectorDamage;
            progressElement.max = maxHP;
        } else {
            result.textContent = totalDamage.toFixed(0) + " HP";
            progressElement.value = totalDamage;
            progressElement.max = maxHP;
        }
    });

    // Initialization
    preloadImages();
    const lastChosenBackground = localStorage.getItem('chosenBackground');
    if (lastChosenBackground) {
        fadeBackground(lastChosenBackground);
        changeContainerBackgroundColor(lastChosenBackground);
    } else {
        const defaultBackground = backgroundImages[0];
        localStorage.setItem('chosenBackground', defaultBackground);
        fadeBackground(defaultBackground);
        changeContainerBackgroundColor(defaultBackground);
    }
});
