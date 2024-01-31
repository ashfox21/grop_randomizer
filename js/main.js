"use strict"

const newTeamButton = document.querySelector("._card__get-new-title");
const newTeamFormBlock = document.querySelector("._card__get-new-form");
const newTeamInput = document.querySelector("._card__get-new-input");
const newTeamButtonAllBlock = document.querySelector("._card__get-new-inner");
const newTeamTrigger = document.querySelector("._card__get-new");

const colors = [
    "#D16500",
    "#FDCF08",
    "#B6C423",
    "#7DA838",
    "#418F3E",
    "#1AA179",
    "#1AA19B",
    "#0C91DA",
    "#0034D1",
    "#2E4289",
    "#4B2F94",
    "#C61350",
    "#C52F00",
    "#D16500",
    "#FDCF08",
    "#B6C423",
    "#7DA838",
    "#418F3E",
    "#1AA179",
    "#1AA19B",
    "#0C91DA",
    "#0034D1",
    "#2E4289",
    "#4B2F94",
    "#C61350",
    "#C52F00"
];


let teamsArray = [
    // {
    //     teamName: "team 1",
    //     members: ["kjnkjb","kjbfvkdfjb,kfjevjfhb"],
    //     color:"#D16500"
    // },
    // {
    //     teamName: "team 1",
    //     members: ["kjnkjb","kjbfvkdfjb,kfjevjfhb"],
    //     color:"#D16500"
    // },
    // {
    //     teamName: "team 1",
    //     members: ["kjnkjb","kjbfvkdfjb,kfjevjfhb"],
    //     color:"#D16500"
    // },
];

function redistributeTheTeamColors(teamsArray) {
    const colors = [
        "#D16500",
        "#FDCF08",
        "#B6C423",
        "#7DA838",
        "#418F3E",
        "#1AA179",
        "#1AA19B",
        "#0C91DA",
        "#0034D1",
        "#2E4289",
        "#4B2F94",
        "#C61350",
        "#C52F00",
        "#D16500",
        "#FDCF08",
        "#B6C423",
        "#7DA838",
        "#418F3E",
        "#1AA179",
        "#1AA19B",
        "#0C91DA",
        "#0034D1",
        "#2E4289",
        "#4B2F94",
        "#C61350",
        "#C52F00"
    ];

    teamsArray.forEach((team, index) => {
        const teamColor = colors[index];
        team.color = teamColor;
    });
}



const cards = document.querySelector("._teams__cards");
let teams = cards.querySelectorAll("._card");

// Показать блок с формой
function showNewTeamForm(buttonBlock, formBlock, input) {
    buttonBlock.classList.add('_hide');
    formBlock.classList.remove('_hide');
    input.focus();
}

// скрыть блок с формой
function hideNewTeamForm(buttonBlock, formBlock) {
    buttonBlock.classList.remove('_hide');
    formBlock.classList.add('_hide');
}

// Ищет все карточки и задает события для каждой
function cardInteraction() {
    for (let el of teams) {
        if (el.classList.contains("_card__get-new")) continue;

        el.addEventListener("click", event => handleCardClick(el, event));
    }
}

// Делегирование событий при кликах на карточку
function handleCardClick(el, event) {
    const target = event.target;
    const elemIndex = +el.classList[2].slice(12);
    // Для управления карточкой
    const cardHeader = el.querySelector("._card__header");
    const cardFormBlock = el.querySelector("._card__header-form");
    const cardNameInput = el.querySelector("._card__header-input");
    const cardName = el.querySelector("._card__team-name");
    // Для управления участниками
    const memberGetButton = el.querySelector(".card__new-member-btn");
    const memberFormBlock = el.querySelector("._member-form-block");
    const memberNameInput = el.querySelector("._member-form");

    if (target.closest("._card__delete-btn")) {
        deleteCard(elemIndex);
    } else if (target.closest("._card__edit-btn")) {
        editCard(cardNameInput, cardName, cardHeader, cardFormBlock);
    } else if (target.closest("._card__header-button-remove")) {
        cancelEdit(cardHeader, cardFormBlock, cardNameInput);
    } else if (target.closest("._card__header-button-rename")) {
        renameCard(elemIndex, cardNameInput, cardHeader, cardFormBlock);
    }

    // Смена названия карточки по клавище enter
    cardNameInput.addEventListener("keyup", event => {
        if (event.code === 'Enter') {
            renameCard(elemIndex, cardNameInput, cardHeader, cardFormBlock);
        }
    });


    // управление участниками
    if (target.closest(".card__new-member-btn")) {
        createMember(memberGetButton, memberFormBlock, memberNameInput);
    } else if (target.closest("._remove-new-member")) {
        cancelMemberEdit(memberGetButton, memberFormBlock, memberNameInput);
    } else if (target.closest("._member-add")) {
        addMember(elemIndex, memberNameInput, memberGetButton, memberFormBlock);
    } else if (target.closest(".card__member-delete-btn")) {
        const memberBlock = target.parentElement.parentElement;
        deleteMember(elemIndex, memberBlock);
    }

    // Добавление участника по клавише enter
    memberNameInput.addEventListener("keyup", event => {
        if (event.code === 'Enter') {
            addMember(elemIndex, memberNameInput, memberGetButton, memberFormBlock);
        }
    });
}

// Вспомогательные функции для обработки событий
// Функции для управления карточками команд
function deleteCard(elemIndex) {
    teamsArray.splice(elemIndex, 1);
    updateTeams();
}

function editCard(cardNameInput, cardName, cardHeader, cardFormBlock) {
    cardNameInput.value = cardName.innerHTML.trim();
    showNewTeamForm(cardHeader, cardFormBlock, cardNameInput);
}

function cancelEdit(cardHeader, cardFormBlock, cardNameInput) {
    hideNewTeamForm(cardHeader, cardFormBlock, cardNameInput);
    cardNameInput.value = "";
}

function renameCard(elemIndex, cardNameInput, cardHeader, cardFormBlock) {
    teamsArray[elemIndex].teamName = cardNameInput.value;
    updateTeams();
    hideNewTeamForm(cardHeader, cardFormBlock, cardNameInput);
}

// функция для управления участниками
function createMember(memberGetButton, memberFormBlock, memberNameInput) {
    showNewTeamForm(memberGetButton, memberFormBlock, memberNameInput);
}

function cancelMemberEdit(memberGetButton, memberFormBlock, memberNameInput) {
    hideNewTeamForm(memberGetButton, memberFormBlock);
    memberNameInput.value = "";
}

function addMember(elemIndex, memberNameInput, memberGetButton, memberFormBlock) {
    teamsArray[elemIndex].members.push(memberNameInput.value);
    updateTeams();
    hideNewTeamForm(memberGetButton, memberFormBlock);
    memberNameInput.value = "";
}

function deleteMember(elemIndex, memberBlock) {
    const memberIndex = +memberBlock.classList[1].slice(8);
    teamsArray[elemIndex].members.splice(memberIndex, 1);
    updateTeams();
}



// функция, которая создает карточку
function createTeams() {
    createCardElements();
    updateCardDetails();
    cardInteraction();
}

function createCardElements() {
    teamsArray.forEach((el, index, arr) => {
        const cardHtml = createCardHtml(el, index);
        newTeamTrigger.insertAdjacentHTML('beforebegin', cardHtml);
    });

    teams = cards.querySelectorAll("._card");
}

function createCardHtml(data, index) {
    return `
        <div class="card _card  _team-number${index} swiper-slide">
            <div class="card__inner" >
                <div class="card__color-line"></div>
                <div class="card__header _card__header hiding">
                    <p class="card__team-name _card__team-name">
                        ${data.teamName}
                    </p>

                    <div class="card__buttons">
                        <button class="card__edit-btn _card__edit-btn">
                            <img src="images/edit.png" alt="">
                        </button>
                        <button class="card__delete-btn _card__delete-btn">
                            <img src="images/x-mark.png" alt="">
                        </button>
                    </div>
                </div>

                <div class="card__header-form _card__header-form hiding _hide">
                    <input id="newTeam" type="text" class="card__header-input input _card__header-input" placeholder="Назва команди">
                    <div class="card__header-form-buttons buttons-add-remove">
                        <button class="card__header-button-rename add-button _card__header-button-rename">
                            Змінити назву
                        </button>
                        <button class="card__header-button-remove _card__header-button-remove remove-button">
                            <img src="images/clear.png" alt="">
                        </button>
                    </div>
                </div>

                <ul class="_card__member-list card__member-list"></ul>

                <button class="card__new-member-btn hiding get-new">
                    <img src="images/plus.png" alt="">
                    <span>Додати учасника</span>
                </button>

                <div class="_member-form-block hiding _hide">
                    <input id="newTeam" type="text" class="_member-form input" placeholder="Ім'я учасника">
                    <div class="_member-add-buttons buttons-add-remove">
                        <button class="_member-add add-button">
                            Додати учасника
                        </button>
                        <button class="_remove-new-member remove-button">
                            <img src="images/clear.png" alt="">
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
}

// Создание участников в каждой карточке
function updateCardDetails() {
    teams.forEach((el, index, arr) => {
        if (!el.classList.contains("_card__get-new")) {
            const memberList = el.querySelector("._card__member-list");
            teamsArray[index].members.forEach((member, memberIndex) => {
                memberList.insertAdjacentHTML('beforeend', createMemberHtml(member, memberIndex));
            });

            const memberColorLine = el.querySelectorAll("._card__member-color-line ");
            const colorLine = el.querySelector(".card__color-line");
            colorLine.style.backgroundColor = teamsArray[index].color;
            memberColorLine.forEach(el => el.style.backgroundColor = teamsArray[index].color);
        }
    });
}

function createMemberHtml(member, memberIndex) {
    return `
        <li class="card__member _member-${memberIndex} _card__member ">
            <p>${member}</p>
            <button class="card__member-delete-btn _card__member-delete-btn">
                <img src="images/x-mark-black.png" alt="">
            </button>
            <div class="_card__member-color-line card__member-color-line"></div>
        </li>`;
}

// Функция, которая очищает все карточки команд
function deleteTeams() {
    for (let el of teams) {
        if (el.classList.contains("new-card")) continue;
        el.remove();
    }
}

// функция которая переписывает карточки команд по имеющемуся массиву
function updateTeams() {
    deleteTeams();
    createTeams();
}




// Делегирование событий на кнопку создания команды
newTeamButtonAllBlock.addEventListener("click", event => {
    const target = event.target;

    if (target.closest("._card__get-new-title")) {
        // показать кнопку с формой
        showNewTeamForm(newTeamButton, newTeamFormBlock, newTeamInput);
    } else if (target.closest("._card__get-new-button-remove")) {
        // Скрыть кнопку с формой
        hideNewTeamForm(newTeamButton, newTeamFormBlock, newTeamInput);
        newTeamInput.value = "";
    } else if (target.closest("._card__get-new-button-add")) {
        // Создать карточку
        teamsArray.push(
            {
                teamName: newTeamInput.value,
                members: [],
                color: colors[0],
            }
        );
        colors.shift();
        redistributeTheTeamColors(teamsArray)
        updateTeams();
        hideNewTeamForm(newTeamButton, newTeamFormBlock, newTeamInput);
        newTeamInput.value = "";
    }
})

newTeamInput.addEventListener("keyup", event => {
    if (event.code === 'Enter') {
        // Создать карточку на энтер
        teamsArray.push(
            {
                teamName: newTeamInput.value,
                members: [],
                color: colors[0],
            }
        );
        colors.shift();
        redistributeTheTeamColors(teamsArray)
        updateTeams();
        hideNewTeamForm(newTeamButton, newTeamFormBlock, newTeamInput);
        newTeamInput.value = "";

    }
});
redistributeTheTeamColors(teamsArray)
updateTeams();

