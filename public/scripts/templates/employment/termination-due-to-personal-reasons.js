document.addEventListener("DOMContentLoaded", function () {
    const inputs = [
      document.getElementById("companyName"),
      document.getElementById("companyAddress"),
      document.getElementById("companyNumber"),
      document.getElementById("companyManager"),
      document.getElementById("employeeName"),
      document.getElementById("jobPosition"),
      document.getElementById("decisionDate"),
      document.getElementById("warningDate"),
      document.getElementById("employeeDeadline"),
      document.getElementById("workTaskFailure"),
      document.getElementById("employeeWrongDoing")
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
      const decisionDateFormatted = moment(values[6]).format('DD.MM.YYYY');
      const warningDateFormatted = moment(values[7]).format('DD.MM.YYYY');
  
      return `
        <div class="page-content">
          <p style="text-align: justify;">Согласно член 73, член 76 став 1 точка 1 и член 80 од Законот за работни односи (Сл. весник на РМ бр.167/15 - пречистен текст, како и подоцнежните измени објавени под 27/2016; 134/2016; 120/2018; 110/2019; 90/2020; 267/2020; 151/2021; 288/2021) работодавачот - ${values[0]}, со седиште на ул. ${values[1]}, со ЕМБС ${values[2]}, претставувано од Управителот ${values[3]} (во понатамошниот текст: „работодавач/от“), на ден ${decisionDateFormatted}, го донесе следното:</p>
          
          <h4 style="text-align: center; font-weight: bold;">РЕШЕНИЕ</h4>
          <h5 style="text-align: center; font-weight: bold;">за откажување на договорот за вработување поради лични причини</h5>
          
          <p style="text-align: justify;">На работникот ${values[4]}, вработен во ${values[0]}, на работното место: „${values[5]}“, МУ СЕ ОТКАЖУВА ДОГОВОРОТ ЗА ВРАБОТУВАЊЕ и му престанува работниот однос поради лични причини со истекот на отказниот рок од 30 (триесет) дена од денот на приемот на ова решение.</p>
          
          <h5 style="text-align: center; font-weight: bold;">О Б Р А З Л О Ж Е Н И Е</h5>
          <p style="text-align: justify;">Работникот ${values[4]} е ангажиран кај работодавачот врз основа на Договорот за вработување на работна позиција „${values[5]}“.</p>
          <p style="text-align: justify;">Во согласност со својата работна позиција и обврските кои произлегуваат од истата, работникот бил должен да ${values[9]}.</p>
          <p style="text-align: justify;">Меѓутоа, спротивно на горенаведената обврска и определен и очекуван начин на работење на работникот, работникот ${values[10]}.</p>
          <p style="text-align: justify;">Согласно член 73 од Законот за работните односи, предвидено е дека: <span style="font-weight: bold;">Пред откажување на договорот за вработување од лична причина на страна на работникот, работодавачот мора писмено да го предупреди работникот за неисполнувањето на обврските и можноста за отказ во случај работникот да не го подобри своето работење.</span> Врз основа на ова, на ден ${warningDateFormatted} година, работодавачот го предупреди работникот и му даде рок од ${values[8]} дена да го подобри своето однесување.</p>
          <p style="text-align: justify;">За да работникот го подобри своето однесување, од страна на работодавачот му беа обезбедени сите потребни услови за работа и му беа дадени соодветни упаства и насоки, како пред даденото писмено предупредување, така и по приемот на истото. Меѓутоа, работникот и понатаму породлжи со своето однесување и од негова страна повторно ${values[10]}.</p>
          <p style="text-align: justify;">Согласно член 79 од Законот, Работодавачот може да му го откаже договорот за вработување од лични причини на страна на работникот, ако работникот не ги извршува работните обврски утврдени со закон, колективен договор, акт на работодавачот и договорот за вработување.</p>
          <p style="text-align: justify;">Исто така, согласно член 80 од Законот, определено е дека: Работодавачот може да му го откаже договорот за вработување на работникот од лични причини на страна на работникот, ако на работникот му се обезбедени потребните услови за работа и му се дадени соодветни упатства, насоки и писмено предупредување од работодавачот во врска со работата дека работодавачот не е задоволен од начинот на извршување на работните обврски и ако по даденото предупредување во рокот утврден од работодавачот кој не може да биде пократок од 15 дена, од денот на приемот на писменото предупредување, работникот не го подобри своето работење, во случаите утврдени со колективен договор на ниво на гранка, односно оддел, односно на ниво на работодавач.</p>
          <p style="text-align: justify;">Врз основа на горенаведеното, а од причина што на работникот му се обезбедени потребните услови за работа и му се дадени соодветни упатства и насоки, а на работникот не го подобри своето однесување во дадениот период, Договорот за вработување на работникот ќе се смета за престанат во рок од 30 (триесет) дена по приемот на ова решение од страна на работникот, кога и работникот ќе биде одјавен од Агенцијата за вработување. Работникот е должен да го почитува отказниот рок од 30 (триесет) дена, освен доколку договорните страни не се договорат поинаку со писмена спогодба.</p>
          <p style="text-align: justify;">Следствено на горе наведено, работодавачот донесе Одлука како во диспозитивот.</p>
          
          <p style="text-align: justify; font-weight: bold;">Правна поука: Против ова Решеение, Работникот има право на приговор во рок од 8 (осум) дена до Работодавачот.</p>
          
          <table data-pdfmake='{"widths":[250, 250]}'>
            <tr style="border: none">
              <td style="text-align: left;">
                <div>___________________________</div>
                ${values[4]}
              </td>
              <td style="text-align: right;">
                <div>_________________________</div>
                ${values[0]}, ${values[3]}
              </td>
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
            <title>Решение за Откажување на Договор за Вработување поради Лични Причини</title>
            <link rel="stylesheet" href="/styles/documents.css">
          </head>
          <body>${fullAgreementHtml}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  });
  