// shuffles Post Its for display on UI
const shufflePostIts = (postItArray) => {
    let jsonLength = postItArray.length;
    let temporaryListPosition;
    let index;
    while (jsonLength > 0) {
        index = Math.floor(Math.random() * jsonLength);
        jsonLength--;
        temporaryListPosition = postItArray[jsonLength];
        postItArray[jsonLength] = postItArray[index];
        postItArray[index] = temporaryListPosition;
    }
    return postItArray;
}

//POST IT CONTROLS

const showPostIt = () => {
    const questionFront = document.querySelector('.postit-text');
    const answerBox = document.querySelector('.answer-box');
    const showAnswer = document.querySelector('.flip-postit a');
    const resetLink = document.getElementById('reset-link').querySelector('a');
    const nextItem = document.querySelector('.next-postit img');
    const previousItem = document.querySelector('.previous-postit img');

// takes JSON from flask and displays data on Post It
    let flaskJSON = JSON.parse(JSON.parse(flaskData));
    let postItArray = shufflePostIts(flaskJSON)
    let i = 0;

// Post It next button
    nextItem.addEventListener('click', () => {
        questionFront.innerHTML = postItArray[i+1].front;
        answerBox.innerHTML = postItArray[i+1].back;
        if (answerBox.classList.toggle('active')) {
            answerBox.classList.toggle('active');
        }
        i++;
    });

// Post It previous button
    previousItem.addEventListener('click', () => {
        if(i >= 0) {
        questionFront.innerHTML = postItArray[i-1].front;
        answerBox.innerHTML = postItArray[i-1].back;
        if (answerBox.classList.toggle('active')) {
            answerBox.classList.toggle('active');
        }
        i--;
    }
        else {
            i = 0;
        }
    }); 

// shows answer to Post It question
    showAnswer.addEventListener('click', () => {
        answerBox.classList.toggle('active');

    });

// resets Post Its by reshuffling and setting i to 0
    resetLink.addEventListener('click', () => {
        postItArray = shufflePostIts(flaskJSON)
        i = 0;
        questionFront.innerHTML = postItArray[i].front;
        answerBox.innerHTML = postItArray[i].back;
        if (answerBox.classList.toggle('active')) {
            answerBox.classList.toggle('active');
        }
    });

// MENUS CONTROLS

    let leftActive = 0
    let rightActive = 0
    const settingsLink = document.getElementById('settings-link').querySelector('a');
    const collectionsLink = document.getElementById('collection-link').querySelector('a');
    const settingsSubMenu = document.getElementById('settings-submenu-links');
    const collectionsSubMenu = document.getElementById('collections-submenu-links');
    const settingsExitButton = document.querySelector('.settings-submenu-exit')
    const collectionsExitButton = document.querySelector('.collections-submenu-exit')
    const postitBox = document.querySelector('.postit');
    const answerBoxWrapper = document.querySelector('.answer-box-wrapper');
    
// function to move Post Its and Answer Box when menus open
    const movePostItsActive = (direction) => {
        postitBox.classList.add(`menu-move-${direction}`);
        answerBoxWrapper.classList.add(`menu-move-${direction}`);
    };

//function to move Post Its and Answer Box back when menus close
    const movePostItsInactive = (direction) => {
        postitBox.classList.remove(`menu-move-${direction}`);
        answerBoxWrapper.classList.remove(`menu-move-${direction}`);
    };

// opens menu and ensures collection menu is not open
    settingsLink.addEventListener('click', () => {
        settingsSubMenu.classList.add('active');
        movePostItsActive('right')
        leftActive = 1
        if (rightActive == 1) {
            collectionsSubMenu.classList.remove('active');
            movePostItsInactive('left');
        }
    });

    settingsExitButton.addEventListener('click', () => {
        settingsSubMenu.classList.toggle('active');
        movePostItsActive('right')
        leftActive = 0
        movePostItsInactive('right')
    });

// opens menu and ensures setting menu is not open
    collectionsLink.addEventListener('click', () => {
        collectionsSubMenu.classList.add('active');
        movePostItsActive('left')
        rightActive = 1
        if (leftActive == 1) {
            settingsSubMenu.classList.remove('active');
            movePostItsInactive('right')
        }
    });

    collectionsExitButton.addEventListener('click', () => {
        collectionsSubMenu.classList.toggle('active');
        movePostItsActive('left')
        rightActive = 0
        movePostItsInactive('left')
    });

// changes color of post it
    const settingsColorPink = document.querySelector('.postit-color-pink');
    const settingsColorBlue = document.querySelector('.postit-color-blue');
    const settingsColorYellow = document.querySelector('.postit-color-yellow');
    const imagePostIt = document.querySelector('.postit-img');

    settingsColorPink.addEventListener('click', () => {
        imagePostIt.src = 'static/pink_postit.png';
    });

    settingsColorBlue.addEventListener('click', () => {
        imagePostIt.src = 'static/blue_postit.png';
    });

    settingsColorYellow.addEventListener('click', () => {
        imagePostIt.src = 'static/yellow_postit.png';
    });
    
}

showPostIt();
