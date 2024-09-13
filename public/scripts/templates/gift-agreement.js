document.addEventListener("DOMContentLoaded", function () {
    const inputs = [
      document.getElementById("propertyLocationTown"),
      document.getElementById("agreementDate"),
      document.getElementById("givingParty"),
      document.getElementById("givingPartyAddress"),
      document.getElementById("givingPartyPIN"),
      document.getElementById("receivingParty"),
      document.getElementById("receivingPartyAddress"),
      document.getElementById("receivingPartyPIN"),
      document.getElementById("propertySheetNumber"),
      document.getElementById("cadasterMunicipality"),
      document.getElementById("typeOfProperty"),
      document.getElementById("parcelNumber"),
      document.getElementById("propertyAddress"),
      document.getElementById("buildingNumber"),
      document.getElementById("buildingType"),
      document.getElementById("entranceNumber"),
      document.getElementById("floor"),
      document.getElementById("number"),
      document.getElementById("size"),
      document.getElementById("relationship"),
      document.getElementById("mortgage")
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
      const formattedAgreementDate = moment(values[1]).format('DD.MM.YYYY');
  
      let mortgageText = "";
      if (values[20] === "yes") {
        mortgageText = "освен горе цитираното право на залог (хипотека)";
      } else {
        mortgageText = "и дека трети лица немаат никакви права со кои се ограничува сопственоста";
      }
  
      const relationshipParts = values[19].split('-');
      const giverRelation = relationshipParts[0] || "";
      const receiverRelation = relationshipParts[1] || "";
  
      let agreementHtml = `
        <h3 style="text-align: center; font-weight: bold"> Д О Г О В О Р </h3>
        <h4 style="text-align: center; font-weight: bold"> за дар на недвижен имот </h4>
        <p style="text-align: justify; font-weight: normal">
        Склучен во ${values[0]}, на ден ${formattedAgreementDate} година помеѓу:
        </p>
        <p style="text-align: justify; font-weight: normal">
        1. ${values[2]}, со живеалиште на ул. ${values[3]} со ЕМБГ ${values[4]}, како ДАРУВАЧ
        </p>
        <p style="text-align: justify; font-weight: normal"> И </p>
        <p style="text-align: justify; font-weight: normal">
        2. ${values[5]}, со живеалиште на ул. ${values[6]}, со ЕМБГ ${values[7]}, како ДАРОПРИМАЧ.
        </p>
        <h6 style="text-align: center; font-weight: bold"> Член 1 </h6>
        <p style="text-align: justify; font-weight: normal">
        Предмет на овој договор е дар на недвижен имот, каде дарувачот и даропримачот се во крвно сродство од прв наследен ред и тоа дарувачот како ${giverRelation}, а даропримачот како негов ${receiverRelation}.
        </p>
        <h6 style="text-align: center; font-weight: bold"> Член 2 </h6>
        <p style="text-align: justify; font-weight: normal">
        По основ на Имотен лист број ${values[8]} за КО ${values[9]}, дарувачот е сопственик на недвижен имот во ${values[0]} и тоа:
        </p>
        <p style="text-align: justify; font-weight: normal">
        - ${values[10]} на КП ${values[11]}, на адреса ${values[12]}, број на зграда ${values[13]}, намена на зграда ${values[14]}, влез ${values[15]}, кат ${values[16]}, број ${values[17]}, во површина од ${values[18]} м2,
        </p>
        <h6 style="text-align: center; font-weight: bold"> Член 3 </h6>
        <p style="text-align: justify; font-weight: normal">
        Дарувачот му го дарува и му го пренесува во сопственост и владение на даропримачот горецитираниот недвижен имот, а даропримачот со потпишување на овој договор потврдува дека дарувачот му го предал во владение недвижниот имот предмет на дар пред склучување на овој договор и изјавува дека нема никакви забелешки во однос на истиот.
        </p>
        <h6 style="text-align: center; font-weight: bold"> Член 4 </h6>
        <p style="text-align: justify; font-weight: normal">
        Даропримачот го прима дарот со голема благодарност и кон дарувачот ќе се однесува со должната почит како и до сега.
        </p>
        <h6 style="text-align: center; font-weight: bold"> Член 5 </h6>
        <p style="text-align: justify; font-weight: normal">
        Даруваниот недвижен имот со овој договор, нема да му се засмета во наследниот дел на даропримачот.
        </p>
        <h6 style="text-align: center; font-weight: bold"> Член 6 </h6>
        <p style="text-align: justify; font-weight: normal">
        Дарувачот му гарантира на даропримачот дека е единствен и вистинит сопственик на горецитираниот недвижен имот ${mortgageText} и во случај на евикција ќе се јави во заштита на даропримачот.
        </p>
        <h6 style="text-align: center; font-weight: bold"> Член 7 </h6>
        <p style="text-align: justify; font-weight: normal">
        Договорните страни се согласни дека овој договор претставува правен основ за запишување на правото на сопственост од името на дарувачот на име на даропримачот, во Агенцијата за катастар на недвижности и за таа цел се согласуваат и го овластуваат надлежниот нотар кој ќе гo потврди овој договор, да го спроведе овој договор и да го изврши запишувањето во Агенцијата за катастар на недвижности.
        </p>
        <h6 style="text-align: center; font-weight: bold"> Член 8 </h6>
        <p style="text-align: justify; font-weight: normal">
        Договорните страни се согласни сите трошоци во врска со составувањето, потврдувањето и спроведувањето на овој договор пред надлежните органи, да паднат на товар на даропримачот.
        </p>
        <h6 style="text-align: center; font-weight: bold"> Член 9 </h6>
        <p style="text-align: justify; font-weight: normal">
        Во случај на евентуално настанат спор помеѓу договорните страни во врска со овој договор, истите се согласни да се обидат да го решат спогодбено, а во спротивно надлежен за негово решавање ќе биде Основен Граѓански суд во ${values[0]}.
        </p>
        <h6 style="text-align: center; font-weight: bold"> Член 10 </h6>
        <p style="text-align: justify; font-weight: normal">
        Овој договор е составен во 7 (седум) еднообразни примероци, од кои по 1 (еден) за договорните страни, а останатите за службена употреба.
        </p>
        <h6 style="text-align: center; font-weight: bold"> ДОГОВОРНИ СТРАНИ </h6>
        <h6 style="text-align: center; font-weight: bold"> ДАРУВАЧ </h6>
        <h6 style="text-align: center; font-weight: bold"> ___________________________ </h6>
        <h6 style="text-align: center; font-weight: bold"> ${values[2]} </h6>
        <h6 style="text-align: center; font-weight: bold"> ДАРОПРИМАЧ </h6>
        <h6 style="text-align: center; font-weight: bold"> ___________________________ </h6>
        <h6 style="text-align: center; font-weight: bold"> ${values[5]} </h6>
      `;
  
      return agreementHtml;
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
            <title>Договор за дар на недвижен имот</title>
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
  