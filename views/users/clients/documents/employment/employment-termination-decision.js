<!DOCTYPE html>
<html lang="mk">
<head>
  <%- include('../../../../shared/includes/head', { pageTitle: 'Одлука за престанок на Договор за Вработување' }) %>
  <link rel="stylesheet" href="/styles/base.css">
  <link rel="stylesheet" href="/styles/client.css">
  <link rel="stylesheet" href="/styles/forms.css">
  <link rel="stylesheet" href="/styles/navigation.css">
  <link rel="stylesheet" href="/styles/dropdown.css">
  <link rel="stylesheet" href="/styles/tools.css">
  <link rel="stylesheet" href="/styles/documents.css">
  <script src="/scripts/dropdown.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
  <script src="/scripts/templates/employment/employment-termination-decision.js" defer></script>
</head>
<body>
  <main>
    <div class="standard-template">
      <div class="inputs-column">
        <input type="hidden" value="<%= agent.name %>" id="companyName">
        <input type="hidden" value="<%= agent.clientAddress %>" id="companyAddress">
        <input type="hidden" value="<%= agent.manager %>" id="companyManager">
        <input type="date" placeholder="Датум на одлука" id="decisionDate">
        <input type="text" placeholder="Име на вработен" id="employeeName">
        <input type="text" placeholder="Работно место на вработен" id="jobPosition">
        <input type="date" placeholder="Датум на завршување на работен однос" id="employmentEndDate">
        <input type="date" placeholder="Датум на склучување на договор" id="agreementDate">
        <button id="generateButton">Генерирај</button>
      </div>
      <div class="presentation-column">
        <p>Визуелна презентација на содржината.</p>
      </div>
    </div>
  </main>
  <%- include('../../../../shared/includes/footer') %>
</body>
</html>
