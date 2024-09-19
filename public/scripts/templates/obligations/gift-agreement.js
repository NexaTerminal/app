document.addEventListener("DOMContentLoaded", function () {
  // Get form fields
  const givingPartyField = document.getElementById("givingParty");
  const givingPartyAddressField = document.getElementById("givingPartyAddress");
  const givingPartyPINField = document.getElementById("givingPartyPIN");
  
  const receivingPartyField = document.getElementById("receivingParty");
  const receivingPartyAddressField = document.getElementById("receivingPartyAddress");
  const receivingPartyPINField = document.getElementById("receivingPartyPIN");

  const propertyLocationField = document.getElementById("propertyLocationTown");
  const agreementDateField = document.getElementById("agreementDate");

  const propertySheetNumberField = document.getElementById("propertySheetNumber");
  const cadasterMunicipalityField = document.getElementById("cadasterMunicipality");
  const typeOfPropertyField = document.getElementById("typeOfProperty");
  const parcelNumberField = document.getElementById("parcelNumber");
  const propertyAddressField = document.getElementById("propertyAddress");
  const buildingNumberField = document.getElementById("buildingNumber");
  const buildingTypeField = document.getElementById("buildingType");
  const entranceNumberField = document.getElementById("entranceNumber");
  const floorField = document.getElementById("floor");
  const numberField = document.getElementById("number");
  const sizeField = document.getElementById("size");

  const previewElement = document.getElementById("preview-content");

  // Function to update the live preview
  function updateLivePreview() {
    const givingParty = givingPartyField.value || "[Име на дарувачот]";
    const givingPartyAddress = givingPartyAddressField.value || "[Адреса на дарувачот]";
    const givingPartyPIN = givingPartyPINField.value || "[ЕМБГ на дарувачот]";
    
    const receivingParty = receivingPartyField.value || "[Име на даропримачот]";
    const receivingPartyAddress = receivingPartyAddressField.value || "[Адреса на даропримачот]";
    const receivingPartyPIN = receivingPartyPINField.value || "[ЕМБГ на даропримачот]";

    const propertyLocation = propertyLocationField.value || "[Место на имотот]";
    const agreementDate = agreementDateField.value ? moment(agreementDateField.value).format('DD.MM.YYYY') : "[Датум на договорот]";
    
    const propertySheetNumber = propertySheetNumberField.value || "[Имотен лист број]";
    const cadasterMunicipality = cadasterMunicipalityField.value || "[Катастарска општина]";
    const typeOfProperty = typeOfPropertyField.value || "[Тип на имот]";
    const parcelNumber = parcelNumberField.value || "[Број на парцела]";
    const propertyAddress = propertyAddressField.value || "[Адреса на имотот]";
    const buildingNumber = buildingNumberField.value || "[Број на зграда]";
    const buildingType = buildingTypeField.value || "[Намена на зграда]";
    const entranceNumber = entranceNumberField.value || "[Број на влез]";
    const floor = floorField.value || "[Кат]";
    const number = numberField.value || "[Број на имот]";
    const size = sizeField.value || "[Површина во м2]";

    // Update the preview with live data
    previewElement.innerHTML = `
      <strong>Договор за дар на недвижен имот:</strong><br><br>
      <strong>Склучен во:</strong> ${propertyLocation}, на ден ${agreementDate}, помеѓу:<br><br>
      <strong>1. Дарувач:</strong> ${givingParty}, со живеалиште на ул. ${givingPartyAddress}, со ЕМБГ ${givingPartyPIN}; и<br>
      <strong>2. Даропримач:</strong> ${receivingParty}, со живеалиште на ул. ${receivingPartyAddress}, со ЕМБГ ${receivingPartyPIN}.<br><br>
      <strong>Имотни информации:</strong><br>
      - Имотен лист број: ${propertySheetNumber}<br>
      - Катастарска општина: ${cadasterMunicipality}<br>
      - Тип на имот: ${typeOfProperty}<br>
      - Број на парцела: ${parcelNumber}<br>
      - Адреса на имотот: ${propertyAddress}<br>
      - Број на зграда: ${buildingNumber}<br>
      - Намена на зграда: ${buildingType}<br>
      - Број на влез: ${entranceNumber}<br>
      - Кат: ${floor}<br>
      - Број на имот: ${number}<br>
      - Површина во м2: ${size}
    `;
  }

  // Attach event listeners to all form fields
  const formFields = [
    givingPartyField,
    givingPartyAddressField,
    givingPartyPINField,
    receivingPartyField,
    receivingPartyAddressField,
    receivingPartyPINField,
    propertyLocationField,
    agreementDateField,
    propertySheetNumberField,
    cadasterMunicipalityField,
    typeOfPropertyField,
    parcelNumberField,
    propertyAddressField,
    buildingNumberField,
    buildingTypeField,
    entranceNumberField,
    floorField,
    numberField,
    sizeField
  ];

  formFields.forEach(field => {
    field.addEventListener("input", updateLivePreview);
  });

  // Initial preview on page load
  updateLivePreview();
});
