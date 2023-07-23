import { cards } from './cards';
import './css/page.css';
import { openPage } from './index';
export function gameLogic(add: HTMLElement, cardsCount: number) {
    let begin = '';
    // let firstCard: string | undefined;
    // let secondCard: string | undefined;
    let hourseTime = '';
    let random: string[] = [];
    for (let i = 0; i < cardsCount / 2; i++) {
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        random.push(randomCard);
    }
    random = random.concat(random);
    random.sort(() => Math.random() - 0.5);
    begin = random
        .map(
            (card) => `
        <div data-index="${card}">
        <img data-value="${card}"class="card" src='./static/asset/jpg/${card}.jpg' alt='${card}'/>
        </div>`,
        )
        .join('');
    const headHtml = `
     <header class="head">
     <div class="timeline">
        <div class="minutes">
            <div class="min">
                <p>min</p>
            </div>
            <div class="min">
                <p>sek</p>
            </div>
        </div>
        <div class="time">
            <time></time>
        </div>
     </div>
     <div class="startAgain">
        <button class="buttonstart">Начать заново</button>
     </div>
     </header>`;
    const open = `<div class="boxs">${headHtml}
     <div class="cards">${begin}</div> </div>`;
    add.innerHTML = open;
    setTimeout(() => {
        const card = document.querySelectorAll('.card');
        card.forEach((car) => {
            car.setAttribute('src', './static/asset/jpg/рубашка.jpg');
        });
    }, 5000);
    let time = 0;
    const timer = setInterval(() => {
        time++;
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        const gameTimer = document.querySelector('.time') as HTMLElement;
        gameTimer.textContent = `${minutes}.${seconds}`;
        hourseTime = gameTimer.innerHTML;
        const buttonStart = document.querySelector(
            '.buttonstart',
        ) as HTMLElement;
        buttonStart.addEventListener('click', () => {
            time = 0;
            gameTimer.textContent = '00.00';
            clearInterval(timer);
        });
    }, 1000);
    const stopTimer = (): void => {
        clearInterval(timer);
    };
    const card: HTMLInputElement[] = Array.from(
        document.querySelectorAll('.card'),
    );

    let count = 0;
    let firstCard: string | undefined;
    card.forEach((car) => {
        car.addEventListener('click', () => {
            car.setAttribute(
                'src',
                `./static/asset/jpg/${car.dataset.value}.jpg`,
            );
            if (!firstCard) {
                firstCard = car.dataset.value;
            } else {
                let secondCard = car.dataset.value;
                count += 1;
                if (firstCard.charAt(0) === secondCard?.charAt(0)) {
                    firstCard = '';
                    secondCard = car.dataset.value;
                    count += 1;
                    if (cardsCount === count) {
                        stopTimer();
                        const winner = `<div class="container-end">
                    <div class="text">
                    <div><img class="image"src="./static/asset/jpg/winner.png" alt="winner"></div>
                    <h1 class="title-end">Вы выиграли!</h1>
                    </div>
                    <div class="text-end">Затраченное время:</div>
                    <div class="time-end">${hourseTime}</div>
                    <button class="startagain">Играть снова</button>
                    </div>`;
                        add.innerHTML = winner;
                        const buttonAgain = document.querySelector(
                            '.startagain',
                        ) as HTMLElement;
                        buttonAgain.addEventListener('click', () => {
                            return openPage();
                        });
                    }
                } else {
                    stopTimer();
                    const looser = `<div class="container-end">
                    <div class="text">
                    <div><img class="image"src="./static/asset/jpg/looser.png" alt="looser"></div>
                    <h1 class="title-end">Вы проиграли!</h1>
                    </div>
                    <div class="text-end">Затраченное время:</div>
                    <div class="time-end">${hourseTime}</div>
                    <button class="startagain">Играть снова</button>
                    </div>`;
                    add.innerHTML = looser;
                    const buttonAgain = document.querySelector(
                        '.startagain',
                    ) as HTMLElement;
                    buttonAgain.addEventListener('click', () => {
                        return openPage();
                    });
                }
            }
        });
    });
}
