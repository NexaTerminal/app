document.addEventListener('DOMContentLoaded', function () {
    const inputs = [
      document.getElementById('companyName'),
      document.getElementById('companyAddress'),
      document.getElementById('companyManager'),
      document.getElementById('decisionDate'),
      document.getElementById('employeeName'),
      document.getElementById('jobPosition'),
      document.getElementById('employmentEndDate'),
      document.getElementById('agreementDate'),
    ];
  
    const generateButton = document.getElementById('generateButton');
    const livePresentation = document.querySelector('.presentation-column p');
  
    if (!livePresentation) {
      console.error('Presentation element not found!');
      return;
    }
  
    inputs.forEach((input) => {
      if (input) {
        input.addEventListener('input', updateLivePresentation);
      } else {
        console.error('One of the inputs was not found.');
      }
    });
  
    if (generateButton) {
      generateButton.addEventListener('click', generateFullDocument);
    } else {
      console.error('Generate button not found!');
    }
  
    function getDocumentHtml(values) {
      const [
        companyName,
        companyAddress,
        companyManager,
        decisionDate,
        employeeName,
        jobPosition,
        employmentEndDate,
        agreementDate
      ] = values;
  
      // Format the dates using Moment.js
      const formattedDecisionDate = decisionDate ? moment(decisionDate).format('DD.MM.YYYY') : '';
      const formattedEmploymentEndDate = employmentEndDate ? moment(employmentEndDate).format('DD.MM.YYYY') : '';
      const formattedAgreementDate = agreementDate ? moment(agreementDate).format('DD.MM.YYYY') : '';
  
      return `
        <p style="text-align: justify; font-weight: normal">
          Врз основа на член 46, член 62 став 1 точка 1 и член 64 од Законот за работните односи,
          (Службен весник на Република Македонија бр. 167/15 Пречистен текст и подоцнежните измени на законот),
          работодавачот, ${companyName}, со седиште на ул. ${companyAddress}, претставувано од ${companyManager},
          на ден ${formattedDecisionDate} година, ја донесе следната:
        </p>
  
        <h3 style="text-align: center; font-weight: bold">ОДЛУКА</h3>
        <p style="text-align: center; font-weight: bold">
          за престанок на Договорот за вработување поради истек на времето за кое бил склучен
        </p>
  
        <p style="text-align: justify; font-weight: normal">
          На вработениот ${employeeName}, вработен на работна позиција ${jobPosition}, на ден ${formattedEmploymentEndDate} година,
          му престанува работниот однос поради истек на времето на договорот за вработување.
        </p>
  
        <p style="text-align: center; font-weight: bold">Образложение</p>
        <p style="text-align: justify; font-weight: normal">
          ${companyName}, како работодавач и ${employeeName} како работник, на ден ${formattedAgreementDate} година,
          склучија Договор за вработување на определено време (во понатамошниот текст: Договорот).
        </p>
  
        <p style="text-align: justify; font-weight: normal">
          Согласно Договорот, е наведено дека истиот е склучен на определено времетраење.
        </p>
        <p style="text-align: justify; font-weight: normal">
          Согласно на ова, а врз основа на член 64 од Законот за работните односи со кој е предвидено дека:
        </p>
        <p style="text-align: justify; font-weight: normal">
          Договорот за вработување на определено работно време престанува да важи со изминувањето на рокот
          за којшто бил склучен, односно кога договорената работа е завршена или со престанувањето на причината
          заради којашто бил склучен.
        </p>
  
        <p style="text-align: justify; font-weight: normal">
          Врз основа на горенаведеното, вработениот се ослободува од обврската за извршување на работи и работни
          задачи во корист на работодавачот после ${formattedEmploymentEndDate} година.
        </p>
  
        <p style="text-align: justify; font-weight: normal">${formattedDecisionDate} година.</p>
        <br><br><br>
        <table>
          <tr>
            <td style="text-align: left;">
              <div>___________________________</div>
              <p>${companyName}</p>
              <p>${companyManager}</p>
            </td>
          </tr>
        </table>
      `;
    }
  
    function updateLivePresentation() {
      const values = inputs.map((input) => (input ? input.value : ''));
      livePresentation.innerHTML = getDocumentHtml(values);
    }
  
    function generateFullDocument() {
      const values = inputs.map((input) => (input ? input.value : ''));
      const fullDocumentHtml = getDocumentHtml(values);
  
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Одлука за престанок на Договор за Вработување</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h6, p { text-align: center; }
              p { text-align: justify; }
            </style>
          </head>
          <body>${fullDocumentHtml}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  });
  