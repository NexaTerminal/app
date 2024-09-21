document.addEventListener("DOMContentLoaded", function () {
    const inputs = [
      document.getElementById("companyName"),
      document.getElementById("companyAddress"),
      document.getElementById("companyNumber"),
      document.getElementById("companyManager"),
      document.getElementById("employeeName"),
      document.getElementById("employeePIN"),
      document.getElementById("jobPosition"),
      document.getElementById("employmentAgreementDate"),
      document.getElementById("employmentTerminationDate")
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
      const employmentAgreementDateFormatted = moment(values[7]).format('DD.MM.YYYY');
      const employmentTerminationDateFormatted = moment(values[8]).format('DD.MM.YYYY');
  
      return `
        <div class="page-content">
          <p style="text-align: justify;">Врз основа на член 62 став1 точка 4 и член 69 од Законот за работни односи (Сл. Весник на РМ бр. 167/15 – Пречистен текст), на ден ${employmentTerminationDateFormatted} година, се склучи:</p>
          
          <h4 style="text-align: center; font-weight: bold;">СПОГОДБА</h4>
            <h5 style="text-align: center; font-weight: bold;">ЗА РАСКИНУВАЊЕ НА ДОГОВОРОТ ЗА ВРАБОТУВАЊЕ</h5>

          <p style="text-align: justify;">Склучена помеѓу:</p>
          <p style="text-align: justify;">1. ${values[0]}, со седиште на ул. ${values[1]}, Република Северна Македонија, претставувано од ${values[3]} (во понатамошниот текст: Работодавачот); и</p>
          <p style="text-align: justify;">2. ${values[4]}, со ЕМБГ ${values[5]}, работник ангажиран на позиција “${values[6]}”</p>
          
          <p style="text-align: justify; font-style: italic;">Кадешто:</p>
          <p style="text-align: justify;">На ${employmentAgreementDateFormatted} година потпишан е Договор за вработување помеѓу Работодавачот и Работникот, („Договорот за вработување“), согласно кој Работникот работи на работно место “${values[6]}”;</p>
          <p style="text-align: justify;">Работодавачот и Работникот се согласија да го раскинат Договорот за вработување сметано од ${employmentTerminationDateFormatted} година;</p>
          
          <p style="text-align: justify;">Страните се договорија за следното:</p>
          <p style="text-align: center; font-weight: bold;">Член 1</p>
          <p style="text-align: justify;">Врз основа на член 69 став 1 од Законот за работните односи Страните заеднички се согласија да го раскинат договорот за вработување сметано од ${employmentTerminationDateFormatted} година. Последниот работен ден на Работникот е ${employmentTerminationDateFormatted} година.</p>
          
          <p style="text-align: center; font-weight: bold;">Член 2</p>
          <p style="text-align: justify;">На денот на склучувањето на оваа Спогодба Работникот ќе го врати на Работодавачот сето она што Работодавачот го обезбедил на Работникот за извршување на неговите должности. Работникот нема право да задржи било какви оригинали или копии во било каква форма.</p>
          
          <p style="text-align: center; font-weight: bold;">Член 3</p>
          <p style="text-align: justify;">Работникот потврдува дека тој ги има добиено сите износи кои Работодавачот треба да му ги исплати согласно Договорот за вработување се до датумот на оваа Спогодба. Сите побарувања на Работникот во однос на работниот однос и Договорот за вработување се подмирени и Работникот со ова потврдува дека тој нема никакви побарувања кон Работодавачот или кон било која од подружниците на Работодавачот, а особено не побарувања за поврат, надомест од каков и да е вид или какви било други додатни плаќања.</p>
          
          <p style="text-align: center; font-weight: bold;">Член 4</p>
          <p style="text-align: justify;">До денот на престанување на работниот однос, Работникот е обврзан целосно да ги предаде сите документи, ствари, опрема и инвентар, кои и беа дадени за време на извршувањето на обврските кај Работодавачот.</p>
          
          <p style="text-align: center; font-weight: bold;">Член 5</p>
          <p style="text-align: justify;">Работникот исто така се обврзува сите доверливи информации и документи кој се стекнати за време на извршувањето на задачите за време на работниот однос кај Работодавачот да не ги користи за него или да не ги достави до трета страна.</p>
          
          <p style="text-align: center; font-weight: bold;">Член 6</p>
          <p style="text-align: justify;">Работникот се согласува и изјавува дека:</p>
          <p style="text-align: justify;">- по престанокот на работниот однос со работодавачот, нема да шири било какви негативни или навредувачки изјави поврзани со неговата работа кај Работодавачот и/или методите на работа на работодавачот на трети лица;</p>
          <p style="text-align: justify;">- нема да пренесува на трети лица било какви сознанија или податоци добиени или стекнати со работењето кај работодавачот кои претставуваат или пак би можеле да претсавуваат деловна тајна;</p>
          <p style="text-align: justify;">- нема никакви побарувања кон Работодавачот, моментални или идни од било каков вид, врз основа на Договор за вработување или било каков друг акт на работодавачот, кои потекнуваат од времето на работење на работникот кај Работодавачот, вклучени но не ограничени на:</p>
          <p style="text-align: justify;">- нефер/погрешно отпуштање,</p>
          <p style="text-align: justify;">- конструктивно отпуштање,</p>
          <p style="text-align: justify;">- дискриминација по било која основа.</p>
          <p style="text-align: justify;">- нема основ за поведување било какви постапки пред надлежните судови или други органи, за прашања поврзани со работниот однос на Работникот кај Работодавачот.</p>
          
          <p style="text-align: center; font-weight: bold;">Член 7</p>
          <p style="text-align: justify;">На денот на склучување на оваа спогодба на договорот за вработување, Работникот потврдува дека Работодавачот му ги враќа на Работникот сите документи кои му припаѓаат, вклучително, но без ограничување на сертификати и дипломи кои се дел од личното досие на Работникот кај Работодавачот.</p>
          
          <p style="text-align: center; font-weight: bold;">Член 8</p>
          <p style="text-align: justify;">Со потпишувањето на оваа спогодба работодавачот го ослободува работникот од обврската на доаѓање на работа од ${employmentTerminationDateFormatted}.</p>
          
          <p style="text-align: center; font-weight: bold;">Член 9</p>
          <p style="text-align: justify;">Неважноста на поединечни одредби на оваа Спогодба нема да влијае на валидноста на останатите одредби од Спогодбата. Страните се согласни да ги заменат неважечките одредби со важечки одредби кои соодветствуваат, колку што е тоа можно повеќе на почетната економска и друга цел на соодветните одредби.</p>
          
          <p style="text-align: center; font-weight: bold;">Член 10</p>
          <p style="text-align: justify;">Согласно член 69 од Законот за работни односи Работникот е запознат со последиците од спогодбеното раскинување на работниот однос односно дека истиот не може да остварува права по основ на осигурување во случај на невработеност согласно член 67 од Законот за вработување и осигурување во случај на невработеност. Со потпишувањето на оваа Спогодба страните изјавуваат дека внимателно ги прочитаа и ги разбираат содржината и правните последици на оваа Спогодба и таквите последици се во согласност со желбите на страните.</p>
          
          <div style="text-align: center">
            <table style="width:100%">
              <tr>
                <th>Работодавач</th>
                <th>Работник (потпис, цело име и презиме, своерачно датум)</th>
              </tr>
              <tr>
                <th>________________</th>
                <th>________________</th>
              </tr>
              <tr>
                <td>${values[0]} ${values[3]}</td>
                <td>${values[4]}</td>
              </tr>
            </table>
          </div>
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
            <title>Спогодба за Раскинување на Договор за Вработување</title>
            <link rel="stylesheet" href="/styles/documents.css">
          </head>
          <body>${fullAgreementHtml}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  });
  