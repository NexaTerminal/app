document.addEventListener("DOMContentLoaded", function () {
    const inputs = [
      document.getElementById("companyName"),
      document.getElementById("companyAddress"),
      document.getElementById("companyNumber"),
      document.getElementById("companyManager"),
      document.getElementById("employeeName"),
      document.getElementById("employeeAddress"),
      document.getElementById("employeePIN"),
      document.getElementById("jobPosition"),
      document.getElementById("agreementDurationType"),
      document.getElementById("definedDuration")
    ];
  
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
  
    function updateLivePresentation() {
      const values = inputs.map(input => input ? input.value : '');
      livePresentation.innerHTML = `
        <p>Со оваа потврда, ${values[0]} потврдува дека работникот ${values[4]} со адреса на живеење ул. ${values[5]}, ЕМБГ ${values[6]}, е во редовен работен однос и е ангажиран на работно место „${values[7]}“. Договорот за вработување со работникот е склучен на ${values[8]}${values[9] ? ` и тоа до ${values[9]} година.` : ''}</p>
      `;
    }
  });
  