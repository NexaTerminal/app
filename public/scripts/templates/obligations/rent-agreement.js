document.addEventListener("DOMContentLoaded", function () {
  // Get user role selection elements
  const roleLandlordRadio = document.getElementById("roleLandlord");
  const roleLesseeRadio = document.getElementById("roleLessee");

  // Get form fields
  const landlordNameField = document.getElementById("landlordName");
  const landlordAddressField = document.getElementById("landlordAddress");
  const landlordPINField = document.getElementById("landlordPIN");

  const lesseeNameField = document.getElementById("lesseeName");
  const lesseeAddressField = document.getElementById("lesseeAddress");
  const lesseePINField = document.getElementById("lesseePIN");

  // Other field declarations
  const agreementDateField = document.getElementById("agreementDate");
  const propertyCityField = document.getElementById("propertyCity");
  const propertyAddressField = document.getElementById("propertyAddress");
  const propertyParcelNumberField = document.getElementById(
    "propertyParcelNumber"
  );
  const propertySheetNumberField = document.getElementById(
    "propertySheetNumber"
  );
  const propertyParcelLocationField = document.getElementById(
    "propertyParcelLocation"
  );
  const propertySizeField = document.getElementById("propertySize");

  const rentAmountField = document.getElementById("rentAmount");
  const landlordBankAccountField = document.getElementById(
    "landlordBankAccount"
  );
  const landlordBankField = document.getElementById("landlordBank");

  const previewElement = document.getElementById("preview-content");

  // Function to handle user role selection
  function handleUserRoleSelection() {
    if (roleLandlordRadio.checked) {
      // User is landlord
      // Pre-fill landlord fields with client information
      landlordNameField.value = clientName;
      landlordAddressField.value = clientAddress;
      landlordPINField.value = clientPIN;

      // Make landlord fields read-only
      landlordNameField.readOnly = true;
      landlordAddressField.readOnly = true;
      landlordPINField.readOnly = true;

      // Clear lessee fields
      lesseeNameField.value = "";
      lesseeAddressField.value = "";
      lesseePINField.value = "";

      // Make lessee fields editable
      lesseeNameField.readOnly = false;
      lesseeAddressField.readOnly = false;
      lesseePINField.readOnly = false;
    } else if (roleLesseeRadio.checked) {
      // User is lessee
      // Pre-fill lessee fields with client information
      lesseeNameField.value = clientName;
      lesseeAddressField.value = clientAddress;
      lesseePINField.value = clientPIN;

      // Make lessee fields read-only
      lesseeNameField.readOnly = true;
      lesseeAddressField.readOnly = true;
      lesseePINField.readOnly = true;

      // Clear landlord fields
      landlordNameField.value = "";
      landlordAddressField.value = "";
      landlordPINField.value = "";

      // Make landlord fields editable
      landlordNameField.readOnly = false;
      landlordAddressField.readOnly = false;
      landlordPINField.readOnly = false;
    }
    // Update the preview
    updateLivePreview();
  }

  // Attach event listeners to user role selection
  roleLandlordRadio.addEventListener("change", handleUserRoleSelection);
  roleLesseeRadio.addEventListener("change", handleUserRoleSelection);

  // Attach event listeners to all form fields
  const formFields = [
    landlordNameField,
    landlordAddressField,
    landlordPINField,
    lesseeNameField,
    lesseeAddressField,
    lesseePINField,
    agreementDateField,
    propertyCityField,
    propertyAddressField,
    propertyParcelNumberField,
    propertySheetNumberField,
    propertyParcelLocationField,
    propertySizeField,
    rentAmountField,
    landlordBankAccountField,
    landlordBankField,
  ];

  formFields.forEach((field) => {
    field.addEventListener("input", updateLivePreview);
  });

  // Function to update the live preview
  function updateLivePreview() {
    const landlordNameValue =
      landlordNameField.value || "[Име на закуподавачот]";
    const landlordAddressValue =
      landlordAddressField.value || "[Адреса на закуподавачот]";
    const landlordPINValue =
      landlordPINField.value || "[ЕМБГ на закуподавачот]";

    const lesseeNameValue = lesseeNameField.value || "[Име на закупецот]";
    const lesseeAddressValue =
      lesseeAddressField.value || "[Адреса на закупецот]";
    const lesseePINValue = lesseePINField.value || "[ЕМБГ на закупецот]";

    const date = agreementDateField.value
      ? moment(agreementDateField.value).format("DD.MM.YYYY")
      : "[Датум на договорот]";
    const propertyCity = propertyCityField.value || "[Град на имотот]";
    const propertyAddress = propertyAddressField.value || "[Адреса на имотот]";
    const propertyParcelNumber =
      propertyParcelNumberField.value || "[Број на парцела]";
    const propertySheetNumber =
      propertySheetNumberField.value || "[Имотен лист број]";
    const propertyParcelLocation =
      propertyParcelLocationField.value || "[Катастарска општина]";
    const propertySize = propertySizeField.value || "[Квадратура на имотот]";
    const rentAmount = rentAmountField.value || "[Износ на месечна закупнина]";
    const landlordBankAccount =
      landlordBankAccountField.value ||
      "[Трансакциска сметка на закуподавачот]";
    const landlordBank = landlordBankField.value || "[Банка на закуподавачот]";

    // Update the preview with live data
    previewElement.innerHTML = `
    <p style="text-align: left;">Договорните страни:</p><br>
    1. ${landlordNameValue}, со адреса на живеење на ${landlordAddressValue}, со ЕМБГ ${landlordPINValue} (во понатамошниот текст: Закуподавач); и<br>
    2. ${lesseeNameValue}, со адреса на живеење на ${lesseeAddressValue}, со ЕМБГ ${lesseePINValue} (во понатамошниот текст: Закупец).<br>
    На ден ${date} година, склучија:<br>
    <p style="text-align: center;"><strong>ДОГОВОР </strong></p>
    <p style="text-align: center;"><strong>за закуп на недвижен имот</strong></p><br>
    <p style="text-align: center;"><strong>Член 1</strong></p><br>
    Предмет на овој договор е закуп на недвижен имот, а кој се наоѓа во ${propertyCity} на ул. ${propertyAddress}, лоциран на КП ${propertyParcelNumber} а запишан Имотен лист број ${propertySheetNumber} за КО ${propertyParcelLocation}, а кој се состои од:<br>
    - Помошни простории, со квадратура од ${propertySize} м2<br>
    Недвижниот имот опишан во ставот 1 од овој член се издава целосно празен.<br>
    Закуподавачот изјавува дека предметната недвижност не е оптоварена со хипотека до денот на потпишувањето на овој договор.<br>
    <p style="text-align: center;"><strong>Член 2</strong></p><br>
    Овој Договор за закуп се склучува на неопределено време.<br>
    <p style="text-align: center;"><strong>Член 3</strong></p><br>
    Закупецот има обврска на Закуподавачот да му исплаќа месечна закупнина во износ од ${rentAmount},00 денари.<br>
    Закупнината ќе се плаќа во период од 1 (први) до 5 (петти) во месецот за тековниот месец.<br>
    Закупецот се обврзува да ја исплаќа месечната закупнина на трансакциска сметка на Закуподавачот бр. ${landlordBankAccount} при ${landlordBank}, со назнака за месецот за кој се врши односната закупнина.<br>
    Со исплатата на закупнината, закупецот во име на закуподавачот ќе врши исплата и на данокот на личен доход на износот на исплатена закупнина.<br>
    <p style="text-align: center;"><strong>Член 4</strong></p><br>
    Закупецот е согласен и се обврзува да ги сноси сите трошоци за ТЕКОВНО ОДРЖУВАЊЕ (струја, вода, комуналии, управување, огрев, интернет и слично).<br>
    Закупецот е должен без одлагање да изврши промена на корисник кон сите даватели на услуги за трошоците од став 1.<br>
    <p style="text-align: center;"><strong>Член 5</strong></p><br>
    Закуподавачот има право да врши тековен увид во предметниот недвижен имот колку пати ќе сака во текот на годината со предходна 24 часовна писмена најава до Закупецот.<br>
    <p style="text-align: center;"><strong>Член 6</strong></p><br>
    Закупецот е должен да го извести Закуподавачот без непотребно одлагање за секој недостаток на предметот на закуп кој би се покажал во текот на закупот како и за секоја непредвидена опасност која во текот на траењето на закупот би му се заканила на предметот на закуп.<br>
    <p style="text-align: center;"><strong>Член 7</strong></p><br>
    Закупецот не може да го даде предметот на закуп во подзакуп на трети лица врз основа на овој Договор.<br>
    <p style="text-align: center;"><strong>Член 8</strong></p><br>
    Договорните страни се изрично согласни дека овој договор може да биде раскинат со еднострана писмена изјава од било која договорна страна и без потребна согласност од другата договорна страна однапред 60 дена пред неговото раскинување.<br>
    <p style="text-align: center;"><strong>Член 11</strong></p><br>
    Овој договор е склучен во 4 идентични копии, од кои по една за секоја договорна страна, а останатите за надлежни институции.<br>
    Нотарските трошоци, и трошоците за упис на овој Договор во јавна книга се поднесуваат сразмерно.<br>
    <p style="text-align: center;"><strong>Член 12</strong></p><br>
    Во случај на спор, страните се согласни за надлежен суд да биде судот во ${propertyCity}.<br>
    <br>
    Закуподавач:<br>
    ________________________<br>
    ${landlordNameValue}<br>
    <br>
    Закупец:<br>
    _________________________<br>
    ${lesseeNameValue}
  `;
  }

  // Initialize the form based on user role selection
  handleUserRoleSelection();

  // Initial preview on page load
  updateLivePreview();
});
