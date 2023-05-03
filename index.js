let events;
let curEvent = 0;

let currentPassengers = 0;
let totalPassengers = 0;
let notPaid = 0;

async function fetchEvents() {
    const response = await fetch("/api/events");
    return await response.json();
}

function updateInfoText(entered, paid) {
    let div_current = document.querySelector("body > div > div.main_elem.current");
    let div_entered = document.querySelector("body > div > div.main_elem.entered");
    let div_paid = document.querySelector("body > div > div.main_elem.paid");
    let div_total = document.querySelector("body > div > div.main_elem.total");
    let div_notPaid = document.querySelector("body > div > div.main_elem.not-paid");

    div_current.innerHTML = `человек в автобусе: ${currentPassengers}`;
    div_entered.innerHTML = `человек вошло: ${entered}`;
    div_paid.innerHTML = `оплаты: ${paid}`;
    div_total.innerHTML = `всего пассажиров за рейс: ${totalPassengers}`;
    div_notPaid.innerHTML = `всего без билета: ${notPaid}`;
}

/*
    type 1 - пассажир вошёл
    type 2 - пассажир вышел
    type 3 - дверь закрылась
    type 4 - дверь открылась
*/


async function summon() {
    console.log(events[curEvent])
    const response = await fetch("/api/penis", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"asdf":"sdf"})
    });
    console.log(JSON.stringify(events[curEvent]))
}

function getInfo() {
    console.log(curEvent);
    let entered = 0;
    let paid = 0;

    while (events[curEvent]['type'] == 3 || events[curEvent]['type'] == 4) curEvent++;

    outerLoop: for (i = curEvent; ; i++, curEvent++) {
        let event = events[i];

        switch (event['type']) {
            case 1:
                currentPassengers += 1;
                totalPassengers += 1;
                entered += 1;
                if (event['paid']) paid += 1;
                else notPaid += 1;
                break;

            case 2:
                if (currentPassengers - 1 > 0) currentPassengers--;
                break

            case 3:
                break outerLoop;

            case 4:
                continue;
        }
    }

    updateInfoText(entered, paid);
}

window.onload = async () => {
    if (document.location.pathname != "/trip.html") return;

    events = await fetchEvents();

    const loader = document.querySelector('.loader-wrapper');
    loader.classList.add('hide');

    updateInfoText(0, 0);


    $('#video-carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
}