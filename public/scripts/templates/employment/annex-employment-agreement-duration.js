document.addEventListener("DOMContentLoaded", function () {
  const inputs = [
    document.getElementById("companyName"),
    document.getElementById("companyAddress"),
    document.getElementById("companyNumber"),
    document.getElementById("companyManager"),
    document.getElementById("employeeName"),
    document.getElementById("employeeAddress"),
    document.getElementById("employeePIN"),
    document.getElementById("agreementNo"),
    document.getElementById("annexDate"),
    document.getElementById("endDate"),
    document.getElementById("changedArticle")
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
      ${values[9] ? `<p> Предмет на измена на овој анекс е измена на износот на основна плата на договорот за вработување</p>
      <p> Договорот за вработување ќе престане на ${values[9]} година </p>` : ''}  
      <h5 style="text-align: center; font-weight: bold">АНЕКС </h5>
      <h7 style="text-align: center; font-weight: bold">кон ДОГОВОР ЗА ВРАБОТУВАЊЕ БР. ${values[7]} </h7>
      <p style="text-align: justify; font-weight: bold">Склучен во Скопје на ${values[8]} година, помеѓу </p>
      <p style="text-align: justify; font-weight: normal">1. ${values[0]} со седиште на ул. ${values[1]}, Република Северна Македонија, со ЕМБС ${values[2]}, претставувано од ${values[3]}, како работодавач (во понатамошниот текст: Работодавачот); и
      <p style="text-align: justify; font-weight: normal">2. ${values[4]} со адреса на живеење на ул. ${values[5]} со ЕМБГ ${values[6]}, како работник (во натамошниот текст  “работник”)
    
      ${values[9] ? `<p style="text-align: center; font-weight: bold">Член 1
      <p style="text-align: justify; font-weight: normal"> Предмет на измена на овој анекс е измена на износот на основна плата на договорот за вработување.</p>
    
      <p style="text-align: center; font-weight: bold">Член 2
      <p style="text-align: justify; font-weight: normal"> Износот на основна плата во Договорот за вработување  ${values[7]}, сега ќе изнесува __ денари. </p>` : ''}

      <p style="text-align: center; font-weight: bold">Член 3
      <p style="text-align: justify; font-weight: normal">Останатите одредби од Договорот за вработување помеѓу работникот и работодавачот остануваат непроменети. 

      <p style="text-align: center; font-weight: bold">Член 4
      <p style="text-align: justify; font-weight: normal">За се што не е предвидено со овој Анекс ќе се применуваат одредбите од Законот за работните односи и останатите позитивни прописи.

      <p style="text-align: center; font-weight: bold">Член 5
      <p style="text-align: justify; font-weight: normal">Овој Анекс е составен во 2 (два) примероци, по 1 (еден) примерок за секоја договорна страна. 

      <div style="text-align: center">
        <table class="signature-table">
          <tr>
            <th>Работодавач</th>
            <th>Работник</th>
          </tr>
          <tr>
            <th><span class="signature-line">________________</span></th>
            <th><span class="signature-line">________________</span></th>
          </tr>
          <tr>
            <td><p class="signature-name">${values[0]} ${values[3]}</p></td>
            <td><p class="signature-name">${values[4]}</p></td>
          </tr>
        </table>
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
          <title>Анекс на Договор за Вработување</title>
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
