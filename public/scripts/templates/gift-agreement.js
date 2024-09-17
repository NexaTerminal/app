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

  const previewElement = document.querySelector(".presentation-column p");

  // Function to update the live preview
  function updateLivePreview() {
    const givingParty = givingPartyField.value || "[Име на дарувачот]";
    const givingPartyAddress = givingPartyAddressField.value || "[Адреса на дарувачот]";
    const givingPartyPIN = givingPartyPINField.value || "[ЕМБГ на дарувачот]";
    
    const receivingParty = receivingPartyField.value || "[Име на даропримачот]";
    const receivingPartyAddress = receivingPartyAddressField.value || "[Адреса на даропримачот]";
    const receivingPartyPIN = receivingPartyPINField.value || "[ЕМБГ на даропримачот]";

    const propertyLocation = propertyLocationField.value || "[Место на имотот]";
    const agreementDate = agreementDateField.value ? moment(agreementDateField.value).format('DD-MM-YYYY') : "[Датум на договорот]";
    
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
      <strong>Договор за подарок:</strong><br>
      <strong>Дарувач:</strong> ${givingParty}, со живеалиште на ул. ${givingPartyAddress}, со ЕМБГ ${givingPartyPIN}.<br>
      <strong>Даропримач:</strong> ${receivingParty}, со живеалиште на ул. ${receivingPartyAddress}, со ЕМБГ ${receivingPartyPIN}.<br>
      <strong>Место на имотот:</strong> ${propertyLocation}.<br>
      <strong>Датум на договорот:</strong> ${agreementDate}.<br>
      <strong>Имотен лист број:</strong> ${propertySheetNumber}.<br>
      <strong>Катастарска општина:</strong> ${cadasterMunicipality}.<br>
      <strong>Тип на имот:</strong> ${typeOfProperty}.<br>
      <strong>Парцелен број:</strong> ${parcelNumber}.<br>
      <strong>Адреса:</strong> ${propertyAddress}.<br>
      <strong>Број на зграда:</strong> ${buildingNumber}.<br>
      <strong>Намена на зграда:</strong> ${buildingType}.<br>
      <strong>Број на влез:</strong> ${entranceNumber}.<br>
      <strong>Кат:</strong> ${floor}.<br>
      <strong>Број на имот:</strong> ${number}.<br>
      <strong>Површина во м2:</strong> ${size}.
    `;
  }

  // Attach event listeners to all form fields
  givingPartyField.addEventListener("input", updateLivePreview);
  givingPartyAddressField.addEventListener("input", updateLivePreview);
  givingPartyPINField.addEventListener("input", updateLivePreview);

  receivingPartyField.addEventListener("input", updateLivePreview);
  receivingPartyAddressField.addEventListener("input", updateLivePreview);
  receivingPartyPINField.addEventListener("input", updateLivePreview);

  propertyLocationField.addEventListener("input", updateLivePreview);
  agreementDateField.addEventListener("input", updateLivePreview);

  propertySheetNumberField.addEventListener("input", updateLivePreview);
  cadasterMunicipalityField.addEventListener("input", updateLivePreview);
  typeOfPropertyField.addEventListener("input", updateLivePreview);
  parcelNumberField.addEventListener("input", updateLivePreview);
  propertyAddressField.addEventListener("input", updateLivePreview);
  buildingNumberField.addEventListener("input", updateLivePreview);
  buildingTypeField.addEventListener("input", updateLivePreview);
  entranceNumberField.addEventListener("input", updateLivePreview);
  floorField.addEventListener("input", updateLivePreview);
  numberField.addEventListener("input", updateLivePreview);
  sizeField.addEventListener("input", updateLivePreview);

  // Initial preview on page load
  updateLivePreview();
});
