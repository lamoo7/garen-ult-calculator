document.addEventListener('DOMContentLoaded', function () {
    const backgroundChangeDiv = document.getElementById('background-change');
    const images = backgroundChangeDiv.querySelectorAll('img');
    const backgroundImages = [
        'Garen.jpg',
        'Garen_Steel-LegionSkin.jpg',
        'Garen_Warring-KingdomsSkin.jpg',
        'Garen_God-KingSkin.jpg',
        'Garen_Demacia-ViceSkin.jpg',
        'Garen_Mecha-KingdomsSkin.jpg',
        'Garen_Mecha-Kingdoms-PrestigeSkin.jpg',
        'Garen_Battle-AcademiaSkin.jpg',
        'Garen_MythmakerSkin.jpg'
    ];

    function preloadImages() {
        backgroundImages.forEach(imageUrl => {
            const img = new Image();
            img.src = imageUrl;
        });
    }

    preloadImages();

    images.forEach(image => {
        image.addEventListener('click', function () {
            const bgUrl = this.dataset.bgUrl;
            fadeBackground(bgUrl);
            changeContainerBackgroundColor(bgUrl);
        });
    });

    const fadeBackground = (bgUrl) => {
        const body = document.body;
        body.style.opacity = '0';

        setTimeout(() => {
            body.style.backgroundImage = `url(${bgUrl})`;

        }, 500);

        setTimeout(() => {
            body.style.opacity = '1';
        }, 1150)
    };

    const changeContainerBackgroundColor = (bgUrl) => {
        const container = document.getElementById('container');
        const specialBackgrounds = ['Garen_Steel-LegionSkin.jpg', 'Garen_God-KingSkin.jpg', 'Garen_Demacia-ViceSkin.jpg', 'Garen_Mecha-KingdomsSkin.jpg'];
        if (specialBackgrounds.includes(bgUrl.split('/').pop())) {
            container.style.backgroundColor = '#7da8ada0';
        } else {
            container.style.backgroundColor = '';
        }
    };

    const ranks = document.querySelectorAll('.rank input');
    const slider = document.querySelector('input[type="range"]');
    const numberInput = document.querySelector('input[type="number"]');
    const modifiers = document.querySelectorAll('input[type="checkbox"]');
    const button = document.querySelector('button');
    const result = document.querySelector('p span');

    ranks[0].checked = true;
    ranks[0].parentNode.querySelector('.fa-check').style.display = 'inline-block';

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

    button.addEventListener('click', function () {
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

        let totalDamage = calculateDmg(maxHP, baseDamage, missingHealthPercent);

        modifiers.forEach(modifier => {
            if (modifier.checked) {
                const modifierValue = parseInt(modifier.value);
                totalDamage *= (100 + modifierValue) / 100;
            }
        });

        result.textContent = totalDamage.toFixed(0) + " HP";
    });

    slider.addEventListener('input', function () {
        numberInput.value = this.value;
    });

    numberInput.addEventListener('input', function () {
        slider.value = this.value;
    });

    const calculateDmg = (maxHP, baseDmg, missingHpPerc) => {
        const threshold = Math.floor((100 * baseDmg + missingHpPerc * maxHP) / (100 + missingHpPerc));
        return Math.min(threshold, maxHP);
    }
});
