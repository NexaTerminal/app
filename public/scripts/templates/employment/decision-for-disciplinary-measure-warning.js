document.addEventListener("DOMContentLoaded", function () {
    const inputs = [
        document.getElementById("companyName"),
        document.getElementById("companyAddress"),
        document.getElementById("companyNumber"),
        document.getElementById("companyManager"),
        document.getElementById("employeeName"),
        document.getElementById("jobPosition"),
        document.getElementById("employeeWrongDoing"),
        document.getElementById("workTaskFailure"),
        document.getElementById("sanctionDate")
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
        const sanctionDateFormatted = moment(values[8]).format('DD.MM.YYYY');

        return `
            <div class="page-content">
                <p style="text-align: justify; font-weight: normal">Согласно член 84 од Законот за работни односи (Сл. весник на РМ бр.167/15 - пречистен текст) работодавачот - ${values[0]}, со седиште на ул. ${values[1]}, Република Северна Македонија, со ЕМБС ${values[2]}, претставувано од Управителот ${values[3]} од Скопје, на ден ${sanctionDateFormatted} година, ја изрече следната:</p>
                
                <h4 style="text-align: center; font-weight: bold">ДИСЦИПЛИНСКА  МЕРКА</h4>
                <h4 style="text-align: center; font-weight: bold">- Опомена -</h4>
                
                <p style="text-align: justify; font-weight: normal">Работникот ${values[4]}, вработен во ${values[0]} на работното место ${values[5]}, му се изрекува ДИСЦИПЛИНСКА МЕРКА – ОПОМЕНА поради тоа што истиот прекршил обврски од работниот однос.</p>
                
                <h4 style="text-align: center; font-weight: normal">О Б Р А З Л О Ж Е Н И Е</h4>
                
                <p style="text-align: justify; font-weight: normal">Работникот ${values[4]}, спротивно на одредбите од Законот за работни односи и другите општи и поединечни акти, како и актите на работодавачот, ги прекршил своите обврски кои произлегуваат од работниот однос.</p>
                <p style="text-align: justify; font-weight: normal">Имено, работникот ${values[7]}.</p>
                <p style="text-align: justify; font-weight: normal">Меѓутоа, спротивно на своите обврски од работен однос, ${values[6]}.</p>
                <p style="text-align: justify; font-weight: normal">Согласно наведеното, Ве известуваме дека погоре опишаното постапување е во целост недозволиво и истото претставува повреда на работните обврски.</p>
                <p style="text-align: justify; font-weight: normal">Од овие причини, на работникот ${values[4]} му се изрекува дисциплинска мерка и тоа: Опомена. Ваквата дисциплинска мерка се изрекува, имајќи во предвид дека опишаното дејствие претставува прва повреда на работниот ред и дисциплина од страна на работникот. Меѓутоа доколку од страна на работникот ваквото постапување биде повторно извршено, Ве известуваме дека може да следат парични казни, како и откажување на Договорот за вработување согласно ЗРО.</p>
                
                <p style="text-align: justify; font-weight: normal">Да се достави до: - Работникот, архива;</p>
                
                <p style="text-align: right; font-weight: normal">Работодавач</p>
                <p style="text-align: right; font-weight: normal">_____________________</p>
                <p style="text-align: right; font-weight: normal">Управител ${values[3]}</p>
                
                <br><br><br>
                
                <p style="text-align: right; font-weight: normal">Примил</p>
                <p style="text-align: right; font-weight: normal">_____________________</p>
                <p style="text-align: right; font-weight: normal">${values[4]}</p>
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
                    <title>Одлука за Дисциплинска Мерка - Опомена</title>
                    <link rel="stylesheet" href="/styles/documents.css">
                </head>
                <body>${fullAgreementHtml}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
});
