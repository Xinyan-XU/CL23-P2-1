window.addEventListener('load', function () {
    console.log('page loaded!');

    //make elements inside class to hide & show
    function hideElementsByClassName(className) {
        let elements = document.getElementsByClassName(className);
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    }

    function showElementsByClassName(className) {
        let elements = document.getElementsByClassName(className);
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }
    }

    //make error message to hide and show
    function showElement(element) {
        element.style.display = 'block';
    }

    function hideElement(element) {
        element.style.display = 'none';
    }

    function showError(message) {
        let errorMessage = document.getElementById('error_message');
        errorMessage.textContent = message;
        showElement(errorMessage);
    }

    function hideError() {
        let errorMessage = document.getElementById('error_message');
        errorMessage.textContent = '';
        hideElement(errorMessage);
    }

    //////////////////////////////////////////////////////////////////////
    // api url fetch section
    let button = document.getElementById('plant_search');
    button.addEventListener('click', function () {
        let inputText = document.getElementById('plant_name_type').value;

        // console.log('button clicked');
        // console.log('the text input is: ' + inputText);

        hideElementsByClassName('plant_json');
        hideElementsByClassName('figure_json');
        showElementsByClassName('plant_info');
        showElementsByClassName('plant_img');

        let API_URL = "https://openfarm.cc/api/v1/crops/" + inputText;
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                // console.log(data.data.attributes.binomial_name);
                // console.log(data.data.attributes.description);
                // console.log(data.data.attributes.growing_degree_days);
                // console.log(data.data.attributes.sun_requirements);
                // console.log(data.data.attributes.main_image_path);

                let bioName = document.getElementById('p_bio_name');
                let plantInfo = document.getElementById('p_info');
                let sunCond = document.getElementById('p_suncond');
                let pImg = document.getElementById('p_img');

                bioName.innerHTML = '';
                plantInfo.innerHTML = '';
                sunCond.innerHTML = '';
                pImg.src = '';

                bioName.innerHTML = '<b><u>Biomial Name:</b></u> <br>' + data.data.attributes.binomial_name;
                plantInfo.innerHTML = '<b><u>Brief Intro: </b></u> <br>' + data.data.attributes.description;
                sunCond.innerHTML = '<b><u>Sun Reqs:</b></u> ' + data.data.attributes.sun_requirements;
                pImg.src = data.included[0].attributes.small_url;


                // words limit function 
                function limitWords(textElement, limit) {
                    let text = textElement.textContent.trim();
                    let words = text.split(' ');

                    if (words.length > limit) {
                        let plantText = words.slice(0, limit).join(' ') + '...';
                        textElement.textContent = plantText;
                    }
                }

                let p_info = document.getElementById('p_info');
                limitWords(p_info, 65);

                hideError();
            })

            .catch(error => {
                console.log('API fetch error:', error);
                showError("Hi!! Try again! Tips: Use a hyphen (-) for spaces. Type all lower cases. Try defining plants more specifically. For example, use \"Cucumber-Heirloom-Straight-Eight\" 🥹 instead of just \"cucumber\". Also, try searching for flowers, fruits, and more!");
            });
    })

    //////////////////////////////////////////////////////////////////////
    // json file fetch section
    function buttonDisplayInfo(dataIndex) {

        // Hide the "plant_info" and "plant_img" sections when fetching "plant_json"
        hideElementsByClassName('plant_info');
        hideElementsByClassName('plant_img');
        hideElementsByClassName('error_message');
        showElementsByClassName('plant_json');
        showElementsByClassName('figure_json');
        document.getElementById('plant_name_type').value = '';

        //start fetching
        fetch("plant.json")
            .then((response) => response.json())
            .then((data) => {

                let plants = data.plants[dataIndex];

                let commonName = document.getElementById('b_commonName');
                commonName.innerHTML = '<b><u>Common Name:</b></u> ' + plants.commonName;

                let bioName = document.getElementById('b_bioName');
                bioName.innerHTML = '<b><u>Binomial Name:</b></u> ' + plants.binomialName;

                let sowingCond = document.getElementById('b_sowing');
                sowingCond.innerHTML = '<b><u>Sowing Method:</b></u> ' + plants.sowingMethod;

                let heightCM = document.getElementById('b_height');
                heightCM.innerHTML = '<b><u>Height:</b></u> ' + plants.height;

                let harvestInfo = document.getElementById('b_info');
                harvestInfo.innerHTML = '<b><u>Harvest Info:</b></u> ' + plants.harvest;

            })

            .catch(error => {
                console.log('JSON fetch error:', error);
            });
    }

    let buttonFig = document.getElementById('button_fig');
    buttonFig.addEventListener('click', function () {
        buttonDisplayInfo(0);
    });

    let buttonTaro = document.getElementById('button_taro');
    buttonTaro.addEventListener('click', function () {
        buttonDisplayInfo(1);
    });

    let buttonCorn = document.getElementById('button_corn');
    buttonCorn.addEventListener('click', function () {
        buttonDisplayInfo(2);
    });

    let buttonMelon = document.getElementById('button_wintermelon');
    buttonMelon.addEventListener('click', function () {
        buttonDisplayInfo(3);
    });

    let buttonLuffa = document.getElementById('button_luffa');
    buttonLuffa.addEventListener('click', function () {
        buttonDisplayInfo(4);
    });

    let buttonPotato = document.getElementById('button_potato');
    buttonPotato.addEventListener('click', function () {
        buttonDisplayInfo(5);
    });

    let buttonSquash = document.getElementById('button_squash');
    buttonSquash.addEventListener('click', function () {
        buttonDisplayInfo(6);
    });

    let buttonSpinach = document.getElementById('button_mspinach');
    buttonSpinach.addEventListener('click', function () {
        buttonDisplayInfo(7);
    });

    let buttonBean = document.getElementById('button_bean');
    buttonBean.addEventListener('click', function () {
        buttonDisplayInfo(8);
    });

    let buttonAmaranth = document.getElementById('button_amaranth');
    buttonAmaranth.addEventListener('click', function () {
        buttonDisplayInfo(9);
    });

    let buttonApple = document.getElementById('button_apple');
    buttonApple.addEventListener('click', function () {
        buttonDisplayInfo(10);
    });

    let buttonOkra = document.getElementById('button_okra');
    buttonOkra.addEventListener('click', function () {
        buttonDisplayInfo(11);
    });

    let buttonLoquat = document.getElementById('button_loquat');
    buttonLoquat.addEventListener('click', function () {
        buttonDisplayInfo(12);
    });

    let buttonKumquat = document.getElementById('button_kumquat');
    buttonKumquat.addEventListener('click', function () {
        buttonDisplayInfo(13);
    });

});

//////////////////////////////////////////////////////////////////////
// p5.js content
let images = [];
let img;
let img2;
let ogWidth = 5;
let ogHeight = 20;
let ogWidth2 = 30;
let ogHeight2 = 50;

function preload() {
    img = loadImage('./img/people.png');
    img2 = loadImage('./img/pointer.png');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    //   console.log("p5 misses you too!!");
}

function draw() {
    clear();

    for (let i = 0; i < images.length; i++) {
        let imgObj = images[i];

        // make random generated object moving towards the mouse position
        let dx = mouseX - imgObj.x;
        let dy = mouseY - imgObj.y;
        let angle = atan2(dy, dx);

        let speed = 2;
        imgObj.x += cos(angle) * speed;
        imgObj.y += sin(angle) * speed;

        // resize the img with window width & height
        let scaleFactor = window.innerWidth / 850;
        let newWidth = ogWidth * scaleFactor;
        let newHeight = ogHeight * scaleFactor;
        let newWidth2 = ogWidth2 * scaleFactor;
        let newHeight2 = ogHeight2 * scaleFactor;

        image(img, imgObj.x + 15 * scaleFactor, imgObj.y + 20 * scaleFactor, newWidth, newHeight);
        image(img2, mouseX - 20 * scaleFactor, mouseY - 8 * scaleFactor, newWidth2, newHeight2);
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    clear();
}

function mousePressed() {
    let imgObj = {
        x: random(width),
        y: random(height),
    };

    images.push(imgObj);
}