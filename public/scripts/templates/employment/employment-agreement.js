document.addEventListener("DOMContentLoaded", function () {
  const inputs = [
    document.getElementById("companyName"),
    document.getElementById("companyAddress"),
    document.getElementById("companyNumber"),
    document.getElementById("companyManager"),
    document.getElementById("employeeName"),
    document.getElementById("employeeAddress"),
    document.getElementById("employeePIN"),
    document.getElementById("agreementDate"),
    document.getElementById("agreementDurationType"),
    document.getElementById("definedDuration"),
    document.getElementById("jobPosition"),
    document.getElementById("workTasks"),
    document.getElementById("netSalary"),
    document.getElementById("agreementTimeType"),
    document.getElementById("totalWeekHours"),
    document.getElementById("breakDuration"),
    document.getElementById("dailyWorkTime"),
    document.getElementById("annualLeaveDuration"),
    document.getElementById("noticePeriod"),
    document.getElementById("nonCompeteDuration")
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
    return `
      <div style="padding: 10px; font-size: small;">
        <h3 style="text-align: center; margin-bottom: 0px;">ДОГОВОР ЗА ВРАБОТУВАЊЕ</h3>
        <p style="text-align: left;">Склучен во Скопје на ${values[7]} година, помеѓу:</p>
        <p>${values[0]}, со седиште на ${values[1]} Република Северна Македонија со ЕМБС ${values[2]} претставувано од ${values[3]} (во понатамошниот текст: Работодавачот); и</p>
        <p>${values[4]}, со адреса на живеење на ${values[5]} со ЕМБГ ${values[6]} (во натамошниот текст “работник”)</p>
        <h6 style="text-align: left; font-weight: bold">I. ОПШТИ ОДРЕДБИ</h6>
        <p style="text-align: center;">Член 1</p>
        <p>Овој договор го уредува засновањето на работниот однос правата и обврските што произлегуваат од работниот однос во согласност со Законот за работни односи на Република Северна Македонија и одговорностите на работодавецот ${values[0]} и работникот.</p>
        <p style="text-align: center;">Член 2</p>
        <p>1) Овој договор стапува на сила на ${values[7]} година.</p>
        <p style="text-align: center;">Член 3</p>
        <p>Договорот за вработување е склучен на ${values[8]}</p>
        <p>${values[9] ? `и престанува да важи на ${values[9]} година.` : ''}</p>
        <p style="text-align: center;">Член 4</p>
        <p>1) Работникот заснова работа за работно место ${values[10]}.</p>
        <p>2) Опис на работно место и работни задачи: ${values[11]}</p>
        <p>3) Во случаите утврдени со закон и со важечките колективни договори работникот е должен да извршува и други работни задачи согласно со стручното оспособување на работникот во согласност со упатствата на работодавецот.</p>
        <p style="text-align: center;">Член 5</p>
        <p>Работникот ќе ги извршува своите должности на локацијата на работодавачот и на други места утврдени со работодавачот.</p>
        <h6 style="text-align: left; font-weight: bold">II. ПЛАТА И НАКНАДИ</h6>
        <p style="text-align: center;">Член 6</p>
        <p>1) Работникот ќе добива месечна плата во износ од ${values[12]} денари.</p>
        <p>2) Платата ќе се исплаќа до 15-ти во месецот за претходниот месец на сметка на работникот во банка.</p>
        <h6 style="text-align: left; font-weight: bold">III. РАБОТНО ВРЕМЕ</h6>
        <p style="text-align: center;">Член 7</p>
        <p>1) Работното време на работникот ќе биде ${values[13]}.</p>
        <p>2) Работникот ќе работи ${values[14]} часа неделно.</p>
        <p>3) Работникот ќе има пауза од ${values[15]} минути секој работен ден.</p>
        <p>4) Дневното работно време ќе биде ${values[16]}.</p>
        <h6 style="text-align: left; font-weight: bold">IV. ПРЕСТАНОК НА РАБОТНИОТ ОДНОС</h6>
        <p style="text-align: center;">Член 17</p>
        <p>1) Работникот може да го раскине договорот за вработување со отказен рок од ${values[17]} месец.</p>
        <h6 style="text-align: left; font-weight: bold">V. ЗАБРАНА ЗА КОНКУРЕНЦИЈА</h6>
        <p style="text-align: center;">Член 14</p>
        <p>За времетраењето или по завршувањето на овој работен однос а најдоцна за период од ${values[18]} години работникот не смее да се јави како основач таен содружник партнер управител одговорно лице вработен надворешен соработник или на друг начин ангажирано лице во трговско друштво формирано во државата или надвор од неа кое врши иста или слична дејност со дејноста работодавачот.</p>
      </div>
    `;
  }

  function updateLivePresentation() {
    const values = inputs.map(input => input.value);
    livePresentation.innerHTML = getAgreementHtml(values);
  }

  function generateFullAgreement() {
    const values = inputs.map(input => input.value);
    const fullAgreementHtml = getAgreementHtml(values);

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Договор за вработување</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h3, h4 { text-align: center; }
            p { text-align: justify; }
          </style>
        </head>
        <body>${fullAgreementHtml}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
});
