document.addEventListener("DOMContentLoaded", function () {
    const inputs = [
        document.getElementById("companyName"),
        document.getElementById("companyAddress"),
        document.getElementById("companyNumber"),
        document.getElementById("companyManager"),
        document.getElementById("employeeName"),
        document.getElementById("jobPosition"),
        document.getElementById("employeeWrongDoing"),
        document.getElementById("employeeWrongdoingDate"),
        document.getElementById("workTaskFailure"),
        document.getElementById("sanctionAmount"),
        document.getElementById("sanctionPeriod"),
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
        const sanctionDateFormatted = moment(values[11]).format('DD.MM.YYYY');
        const wrongdoingDateFormatted = moment(values[7]).format('DD.MM.YYYY');

        return `
            <div class="page-content">
                <p style="text-align: justify; font-weight: normal">Согласно член 84 од Законот за работни односи (Сл. весник на РМ бр.167/15 - пречистен текст) работодавачот – ${values[0]}, со седиште на  ${values[1]}, со ЕМБС ${values[2]}, претставувано од Управителот ${values[3]}, на ден ${sanctionDateFormatted} година, ја изрече следната:</p>
                
                <h2 style="text-align: center; font-weight: bold">ДИСЦИПЛИНСКА  МЕРКА</h2>
                <h4 style="text-align: center; font-weight: bold">-Парична казна-</h4>
                
                <p style="text-align: justify; font-weight: normal">На Работникот ${values[4]}, вработен во ${values[0]}, му се изрекува ДИСЦИПЛИНСКА МЕРКА – парична казна, во висина од ${values[9]}% од нето платата, во времетраење од ${values[10]} месеци почнувајќи од овој месец, поради тоа што истата прекршил обврски од работниот однос.</p>
                
                <h4 style="text-align: center; font-weight: bold">О Б Р А З Л О Ж Е Н И Е</h4>
                
                <p style="text-align: justify; font-weight: normal">Работникот ${values[4]}, спротивно на одредбите од Законот за работни односи и другите општи и поединечни акти, како и актите на работодавачот, ги прекршил своите обврски кои произлегуваат од работниот однос.</p>
                <p style="text-align: justify; font-weight: normal">Имено, работникот ${values[4]} вработен на позиција „${values[5]}“, бил должен да ${values[8]}.</p>
                <p style="text-align: justify; font-weight: normal">Меѓутоа, на ден ${wrongdoingDateFormatted}, именуваниот работник ${values[6]}.</p>
                <p style="text-align: justify; font-weight: normal">Со ваквото постапување работникот ги прекршил работниот ред и дисциплина кај работодавачот што негативни влијаело на деловните интереси и начинот на организација на работниот процес.</p>
                <p style="text-align: justify; font-weight: normal">Согласно наведеното, Ве известуваме дека погоре опишаното постапување е во целост недозволиво и истото претставува сериозна повреда на работните обврски.</p>
                <p style="text-align: justify; font-weight: normal">Од овие причини, на работникот ${values[4]} му се изрекува дисциплинска мерка и тоа: парична казна, во висина од ${values[9]}% од нето платата, во времетраење од ${values[10]} месеци, која ќе отпочне со реализација со исплатата на платата од овој месец.</p>
                <p style="text-align: justify; font-weight: normal">Ваквата дисциплинска мерка се изрекува на работникот, имајќи ги предвид видот и сериозноста на повредата на работниот ред и дисциплина од страна на работникот.</p>
                
                <p style="text-align: justify; font-weight: normal">Да се достави до: - Работникот и архива на Работодавач;</p>
                
                <p style="text-align: right; font-weight: normal">Работодавач</p>
                <p style="text-align: right; font-weight: normal">${values[0]}</p>
                <p style="text-align: right; font-weight: normal">_____________________</p>
                <p style="text-align: right; font-weight: normal">Управител ${values[3]}</p>
                
                <br><br>
                
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
                    <title>Одлука за Дисциплинска Мерка</title>
                    <link rel="stylesheet" href="/styles/documents.css">
                </head>
                <body>${fullAgreementHtml}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
});
