<!DOCTYPE html>
<html lang="mk">
<head>
  <%- include('../../../shared/includes/head', {pageTitle: 'Договор за дар на недвижен имот'})%>
  <link rel="stylesheet" href="/styles/base.css">
  <link rel="stylesheet" href="/styles/client.css">
  <link rel="stylesheet" href="/styles/forms.css">
  <link rel="stylesheet" href="/styles/navigation.css">
  <link rel="stylesheet" href="/styles/dropdown.css">
  <link rel="stylesheet" href="/styles/tools.css">
  <link rel="stylesheet" href="/styles/documents.css">
  <script src="/scripts/dropdown.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
  <script src="/scripts/templates/gift-agreement.js" defer></script>
</head>
<body>
  <main>
    <div class="standard-template">
      <div class="inputs-column">
        <input type="text" placeholder="Место на имотот" id="propertyLocationTown">
        <input type="date" placeholder="Датум на договорот" id="agreementDate">
        <input type="text" placeholder="Име на дарувачот" id="givingParty">
        <input type="text" placeholder="Адреса на дарувачот" id="givingPartyAddress">
        <input type="text" placeholder="ЕМБГ на дарувачот" id="givingPartyPIN">
        <input type="text" placeholder="Име на даропримачот" id="receivingParty">
        <input type="text" placeholder="Адреса на даропримачот" id="receivingPartyAddress">
        <input type="text" placeholder="ЕМБГ на даропримачот" id="receivingPartyPIN">
        <input type="text" placeholder="Имотен лист број" id="propertySheetNumber">
        <input type="text" placeholder="Кадастрска општина" id="cadasterMunicipality">
        <input type="text" placeholder="Тип на имот" id="typeOfProperty">
        <input type="text" placeholder="Број на парцела" id="parcelNumber">
        <input type="text" placeholder="Адреса на имотот" id="propertyAddress">
        <input type="text" placeholder="Број на зграда" id="buildingNumber">
        <input type="text" placeholder="Намена на зграда" id="buildingType">
        <input type="text" placeholder="Број на влез" id="entranceNumber">
        <input type="text" placeholder="Кат" id="floor">
        <input type="text" placeholder="Број" id="number">
        <input type="text" placeholder="Површина во м2" id="size">
        <input type="text" placeholder="Однос меѓу дарувачот и даропримачот (на пр. татко-син)" id="relationship">
        <label for="mortgage">Има ли хипотека на имотот?</label>
        <select id="mortgage">
          <option value="no">Не</option>
          <option value="yes">Да</option>
        </select>
        <button id="generateButton">Генерирај</button>
      </div>
      <div class="presentation-column">
        <p>Визуелна презентација на содржината.</p>
      </div>
    </div>
  </main>
  <%- include('../../../shared/includes/footer')%>
</body>
</html>
