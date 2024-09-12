document.addEventListener("DOMContentLoaded", function () {
    const inputs = [
        document.getElementById("companyName"),
        document.getElementById("companyAddress"),
        document.getElementById("companyNumber"),
        document.getElementById("companyManager"),
        document.getElementById("employeeName"),
        document.getElementById("annualLeaveYear"),
        document.getElementById("annualLeaveStart"),
        document.getElementById("annualLeaveEnd")
    ];

    const generateButton = document.getElementById("generateButton");
    const livePresentation = document.querySelector(".presentation-column p");

    if (!livePresentation) {
        console.error("Presentation element not found!");
        return;
    }

    inputs.forEach(input => {
        if (input) {
            input.addEventListener("input", updateLivePresentation);
        } else {
            console.error("One of the inputs was not found.");
        }
    });

    if (generateButton) {
        generateButton.addEventListener("click", generateFullAgreement);
    } else {
        console.error("Generate button not found!");
    }

    function getAgreementHtml(values) {
        const currentDate = moment().format('DD.MM.YYYY');

        return `
            <div class="page-content">
                <p style="text-align: justify; font-weight: normal">Врз основа на член 137, член 138 став 1 и член 139 од Законот за работните односи (Службен Весник на РМ бр. 167/2016 – Пречистен текст; 27/2016 и 135/2016) Работодавачот ${values[0]}, со седиште на ${values[1]}, со ЕМБС ${values[2]}, претсавувано од Управител ${values[3]}, на ден ${currentDate} година, го донесе следното:</p>
            
                <h2 style="text-align: center; font-weight: bold">Р Е Ш Е Н И Е</h2>
                <h4 style="text-align: center; font-weight: bold">за користење годишен одмор</h4>
            
                <p style="text-align: justify; font-weight: normal">На работникот ${values[4]}, вработен во ${values[0]}, му се одобрува користење на годишен одмор за ${values[5]} година.</p>
            
                <p style="text-align: justify; font-weight: normal">Работникот ќе го користи годишниот одмор почнувајќи од ${moment(values[6]).format("DD.MM.YYYY")} година, до ${moment(values[7]).format('DD.MM.YYYY')} година.</p>
            
                <p style="text-align: justify; font-weight: normal">Работникот е должен да се јави на работа по завршувањето на годишниот одмор.</p>
            
                <h4 style="text-align: center; font-weight: bold">О б р а з л о ж е н и е</h4>
            
                <p style="text-align: justify; font-weight: normal">Во согласност со потребите на работниот процес, Работодавачот ${values[0]} претсавуван преку Управител ${values[3]}, а врз основа на Барање за годишен одмор од работникот ${values[4]}, одлучи како во диспозитивот на решението.</p>
            
                <p style="text-align: justify; font-weight: normal">Правото и времетраењето на годишниот одмор е утврдено во согласност со одредбите од Законот за работни односи, актите на работодавачот и потребите на процесот на работа.</p>
            
                <p style="text-align: justify; font-weight: normal">Правна поука: Против ова Решение работникот има право на приговор, во рок од осум дена од приемот на Решението.</p>
            
                <p style="text-align: justify; font-weight: normal">Доставено до:</p>
                <p style="text-align: justify; font-weight: normal">- работникот</p>
                <p style="text-align: justify; font-weight: normal">- архива</p>
            
                <p style="text-align: left; font-weight: normal">${currentDate} година</p>
            
                <p style="text-align: right; font-weight: normal">За работодавачот</p>
                <p style="text-align: right; font-weight: normal">${values[0]}</p>
            
                <p style="text-align: right; font-weight: normal">_____________________</p>
                <p style="text-align: right; font-weight: normal margin:0px">Управител ${values[3]}</p>
            </div>
            

        `;
    }

    function updateLivePresentation() {
        const values = inputs.map(input => input ? input.value : '');
        livePresentation.innerHTML = getAgreementHtml(values);
    }

    function generateFullAgreement() {
        const values = inputs.map(input => input ? input.value : '');
        const fullAgreementHtml = getAgreementHtml(values);

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Решение за Годишен Одмор</title>
                    <link rel="stylesheet" href="/styles/documents.css">
                </head>
                <body>${fullAgreementHtml}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
});

/* <div class="page-break"></div>
            
<div class="page-content">
    <p style="text-align: left; font-weight: normal">ОД:</p>
    <p style="text-align: left; font-weight: normal">${values[4]},</p>
    <p style="text-align: left; font-weight: normal">вработен во ${values[0]},</p>

    <p style="text-align: left; font-weight: normal">ДО:</p>
    <p style="text-align: left; font-weight: normal">${values[0]},</p>
    <p style="text-align: left; font-weight: normal">со седиште на ул. ${values[1]},</p>

    <p style="text-align: justify; font-weight: normal">Барање за користење на денови од годишен одмор од ${values[5]} година</p>

    <p style="text-align: justify; font-weight: normal">Јас долупотпишаниот ${values[4]}, барам од менаџментот на мојот работодавач - ${values[0]}, да ми одобри користење на годишен одмор со времетраење од ${moment(values[6]).format("DD.MM.YYYY")} година, до ${moment(values[7]).format('DD.MM.YYYY')} година.</p>

    <p style="text-align: justify; font-weight: normal">Со ова барање истовремено потврдувам дека сум запознат со околноста дека годишниот одмор се користи земајќи како моите лични потреби, така и предвид потребите на работниот процес. Така, во зависност со работниот процес, запознат сум дека единствено по донесување на Решение за користење на годишен одмор од страна на работодавачот, можам оправдано да отсуствувам од работа.</p>

    <p style="text-align: left; font-weight: normal">Со почит,</p>

    <p style="text-align: left; font-weight: normal">${currentDate} година</p>

    <p style="text-align: right; font-weight: normal">_____________________</p>
    <p style="text-align: right; font-weight: normal">${values[4]}</p>
</div> */
