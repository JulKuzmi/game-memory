import './css/index.css';

import { gameLogic } from './game';

export const openPage = () => {
    const add = document.querySelector('.top') as HTMLElement;
    const difficultlyChoose = `<div class="container">
    <h2 class="container-text">Выбери сложность</h2>
    <div class="container-difficultly">
        <div class="container-difficultly-level">
            <input
                class="radio"
                type="radio"
                id="radio1"
                name="radios"
                value="1"
                checked
            />
            <label for="radio1">1</label>
            <input
                class="radio"
                type="radio"
                id="radio2"
                name="radios"
                value="2"
                checked
            />
            <label for="radio2">2</label>
            <input
                class="radio"
                type="radio"
                id="radio3"
                name="radios"
                value="3"
                checked
            />
            <label for="radio3">3</label>
        </div>
    </div>
    <button class="start">Старт</button>
 </div>`;
    add.innerHTML = difficultlyChoose;
    const difficultlyLevels: HTMLInputElement[] = Array.from(
        document.querySelectorAll('.radio'),
    );
    const start = document.querySelector('.start') as HTMLElement;
    let userLevel: string | null;

    for (const level of difficultlyLevels) {
        level.addEventListener('input', () => {
            userLevel = level.value;
            console.log(`Вы выбрали уровень сложности ${userLevel}!`);
        });
    }

    start?.addEventListener('click', () => {
        if (userLevel === '1') {
            gameLogic(add, 6);
        } else if (userLevel === '2') {
            gameLogic(add, 12);
        } else {
            gameLogic(add, 18);
        }
    });
};
openPage();
