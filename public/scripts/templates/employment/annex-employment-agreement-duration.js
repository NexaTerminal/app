document.addEventListener("DOMContentLoaded", function () {
  const inputs = [
    document.getElementById("companyName"),//1
    document.getElementById("companyAddress"),//2
    document.getElementById("companyNumber"),//3
    document.getElementById("companyManager"),//4
    document.getElementById("employeeName"),//5
    document.getElementById("employeeAddress"),//6
    document.getElementById("employeePIN"),//7
    document.getElementById("agreementNo"),//8
    document.getElementById("annexDate"),//9
    document.getElementById("endDate"),//10
    document.getElementById("changedArticle")//11
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

  function getAgreementHtml(values) {
    return `
      <h3 style="text-align:justify; font-weight: bold">Анекс кон договор за вработување ${values[7]}</h3>
      <p style="text-align: justify; font-weight: bold">Кој анекс ќе биде склучен на ${moment(values[8]).format('DD.MM.YYYY')} година, помеѓу </p>
      <p style="text-align: justify; font-weight: normal">1. ${values[0]} со седиште на ул. ${values[1]}, Република Северна Македонија, со ЕМБС ${values[2]}, претставувано од ${values[3]}, како работодавач (во понатамошниот текст: Работодавачот); и</p>
      <p style="text-align: justify; font-weight: normal">2. ${values[4]} со адреса на живеење на ул. ${values[5]} со ЕМБГ ${values[6]}, како работник (во натамошниот текст: "работник").</p>
      <p style="text-align: justify; font-weight: normal">Вработувањето останува на определено времетраење, сега со датум до ${moment(values[9]).format('DD.MM.YYYY')} година. </p>
      <p style="text-align: justify; font-weight: normal">Членот ${values[10]} од Договорот се изменува и сега гласи: </p>
      <p style="text-align: justify; font-weight: normal">Договорот за вработување е склучен на определено времетраење и истиот престанува на ${moment(values[9]).format('DD.MM.YYYY')} година. </p>
    `;
  }

  function updateLivePresentation() {
    const values = inputs.map(input => input ? input.value : '');
    livePresentation.innerHTML = getAgreementHtml(values);
  }
});



  // if (generateButton) {
  //   generateButton.addEventListener("click", generateFullAgreement);
  // } else {
  //   console.error("Generate button not found!");
  // }
  
  // function generateFullAgreement() {
  //   const values = inputs.map(input => input ? input.value : '');
  //   const fullAgreementHtml = getAgreementHtml(values);

  //   const printWindow = window.open('', '_blank');
  //   printWindow.document.write(`
  //     <html>
  //       <head>
  //         <title>Анекс на Договор за Вработување</title>
  //         <style>
  //           body { font-family: Arial, sans-serif; padding: 20px; }
  //           h3, h4 { text-align: center; }
  //           p { text-align: justify; }
  //         </style>
  //       </head>
  //       <body>${fullAgreementHtml}</body>
  //     </html>
  //   `);
  //   printWindow.document.close();
  //   printWindow.print();
  // }