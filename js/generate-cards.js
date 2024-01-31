"use strict"


// Работа счетчика
const groupQuanityBlock = document.querySelectorAll("._generated-cards__quanity");
groupQuanityBlock.forEach(el => el.addEventListener("click", event => {
    const target = event.target;
    const groupValues = document.querySelectorAll("._generated-cards__quanity-value");

    if (target.closest("._generated-cards__quanity-minus")) {
        if (+groupValues[0].innerHTML > 2) {

        groupValues[0].innerHTML = +groupValues[0].innerHTML -1;
        groupValues[1].innerHTML = +groupValues[1].innerHTML -1;
        }
    } else if (target.closest("._generated-cards__quanity-plus")) {
        if (+groupValues[0].innerHTML < 15) {
            groupValues[0].innerHTML = +groupValues[0].innerHTML +1;
            groupValues[1].innerHTML = +groupValues[1].innerHTML +1;
        }
    }
}));

let pregenerateArrayOfMembers = [];

function prepareArray() {
    teamsArray.forEach(el => {
        const members = el.members;

        const oneTeam = members.map(member => {
            return {
                name: member,
                color: el.color
            }
        })

        pregenerateArrayOfMembers.push(oneTeam);
    });
}

let groupCount = 0;
let randomizeArr = [];

// Создание массива с вложенными подмассивами по количеству групп
function getGroupInArr(groupCount) {
    for (let i = groupCount; i > 0; i--) {
        randomizeArr.push([]);
    }
}

// Получение случайного числа
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// распределение участников по группам
function distributionOfMembers() {
    let i = 0;
    pregenerateArrayOfMembers.forEach(el => {
        while (el.length > 0) {
            const randomMember = getRandomInt(el.length);

            randomizeArr[i].push(el[randomMember]);
            el.splice(randomMember, 1);

            if (i >= randomizeArr.length - 1) {
                i = -1;
            }
            i++;
            
        }
    });
}

// Создает массив, который равномерно распределяет участников команд по группам
function randomizeGroup(groupCount) {
    // Преобразование массива в удобную для считывания форму
    getGroupInArr(groupCount);
    distributionOfMembers();
    // console.log(randomizeArr);
    return randomizeArr;
}

const generateBtn = document.querySelectorAll("._generated-cards__generate-btn");
const groupsBlock = document.querySelector(".groups");
let createdGroups = [];
let exportGroupArr = [[]];

function deleteGroups () {
    const groupCards = groupsBlock.querySelectorAll(".swiper-slide");
    groupCards.forEach(el => {
        el.remove();
    })
}

function hideFirstGenBtn () {
    const genBtn = document.querySelector('._generated-cards__generate-btn');
    const groupCounter = document.querySelector('.generated-cards__quanity-wrapper');

    genBtn.classList.add('_hide');
    groupCounter.classList.add('_hide');
}

function generationScroll () {
    const scrollTarget = document.querySelector(".generated-cards__header");
    const topOffset = document.querySelector(".header").offsetHeight;

    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
        top: offsetPosition,
        behavior: "smooth"
    });
}

generateBtn.forEach(el => el.addEventListener("click", () => {
    const groupCount = +document.querySelector("._generated-cards__quanity-value").innerHTML;
    const groupsHeader = document.querySelector(".generated-cards__header");

    groupsHeader.classList.remove('_hide');

    
    if (groupCount === 0) {
        alert("Введите количество групп");
        return;
    }
    deleteGroups();
    hideFirstGenBtn();
    prepareArray();
    // console.log(createdGroups);
    createdGroups = randomizeGroup(groupCount);

    const createdGroupsNames = createdGroups.map(el => {
        return el.map(obj => obj.name);
    });



    // Создание HTML элементов групп
    createGroupElements(groupsBlock, groupCount);
    
    // Заполнение карточек групп карточками участников
    fillGroupCards(groupsBlock, createdGroups);
    
    // Генерация и заполнение массива для экспорта
    exportGroupArr = generateExportArray(createdGroupsNames, groupCount);
    pregenerateArrayOfMembers = [];
    randomizeArr = [];

    generationScroll();
    console.log(randomizeArr);
}));




function generateExportArray(createdArr, groupCount) {
    const exportArr = [[]];
    for (let i = 1; i <= groupCount; i++) {
        exportArr[0].push(`Группа ${i}`);
    }

    for (let i = 1; createdArr[0].length > 0; i++) {
        exportArr.push([]);

        createdArr.forEach(el => {
            if (el.length > 0) {
                exportArr[i].push(el[0]);
                el.shift();
            }
        });
    }


    return exportArr;
}



function createGroupElements(groupsBlock, groupCount) {
    for (let i = 1; i <= groupCount; i++) {
        groupsBlock.insertAdjacentHTML('beforeend', 
        `
            <div class="card _group-card  _team-number${i} swiper-slide">
                <div class="card__inner" >
                    <div class="card__header _card__header hiding">
                        <p class="card__team-name _card__team-name">
                            Група ${i}
                        </p>
                    </div>

                    <ul class="_card__member-list card__member-list"></ul>
                </div>
            </div>
        `
        );
    }

    groupsBlock.insertAdjacentHTML('beforeend', 
        `
            <div class="swiper-slide">

            </div>
        `
        );
}



function fillGroupCards(groupsBlock, createdGroups) {
    const groupCards = groupsBlock.querySelectorAll("._group-card");
    console.log(groupCards);
    groupCards.forEach((groupCard, index) => {
        createdGroups[index].forEach((member, memberIndex) => {
            const groupList = groupCard.querySelector("._card__member-list");
            groupList.insertAdjacentHTML('beforeend', `
                <li class="card__member _member-${memberIndex}">
                    <span>${member.name}</span>
                    <div class="card__member-color-line" style="background-color: ${member.color}"></div>
                </li>
            `);
        });
    });
}


// const generateBtn = document.querySelector(".generated-cards__generate-btn");
// const groupsBlock = document.querySelector(".groups");
// let createdGroups = [];
// const exportGroupArr = [[]];

// generateBtn.addEventListener("click", () => {
//     // Проверка на заданные группы
//     if (+document.querySelector(".teams__groups-input").value === 0) {
//         alert("Введите количество групп");
//     } else {
//         // получение количества групп
//         groupCount = +document.querySelector(".teams__groups-input").value;

//         prepareArray();
//         // генерация массива групп
//         createdGroups = randomizeGroup();
//         const createdGroupsNames = createdGroups.map(el => {
//             return el.map(obj => obj.name);
//         });


//         
//         console.log(exportGroupArr);

//         // Создание HTML элементов групп
//         createdGroups.forEach((el, index) => {
//             groupsBlock.insertAdjacentHTML('beforeend',
//                 `
//             <div class="teams__card-inner _group-card">
//                                 <div class="card teams__card">
//                                     <div class="card__header">
//                                         <span class="card__team-name">
//                                             Группа ${index + 1}
//                                         </span>
//                                     </div>

//                                     <ul class="card__member-list _group-list">
                                        
//                                     </ul>

//                                 </div>
//                             </div>
//             `);
//         });

//         // Заполнение карточек групп карточками участников
//         const groupsCard = groupsBlock.querySelectorAll("._group-card");

//         groupsCard.forEach((el, index) => {
//             createdGroups[index].forEach((member, memberIndex) => {
//                 const groupList = el.querySelector("._group-list");
//                 groupList.insertAdjacentHTML('beforeend',
//                     `
//             <li class="card__member _member-${memberIndex}">
//                 <span>${member.name}</span>

//                 <div class="card__member-color-line" style="background-color: ${member.color}"></div>
//             </li>
//             `);
//             })
//         });
//     }

// })