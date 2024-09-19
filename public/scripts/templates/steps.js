document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll('.step'); // All form steps
  const nextButtons = document.querySelectorAll('.next-step'); // "Next" buttons
  const progressBar = document.getElementById('progress'); // Progress bar element
  const progressLabel = document.getElementById('progress-label'); // Label showing percentage
  let currentStep = 0; // Current step index

  // Calculate progress percentages based on number of steps
  const stepsArray = Array.from(steps);
  const totalSteps = stepsArray.length;
  const progressPercentages = stepsArray.length > 1 ? stepsArray.map((_, i) => Math.round(((i + 1) / totalSteps) * 100)) : [100];

  // Function to show the current step and update progress bar
  function showStep(stepIndex) {
    stepsArray.forEach(step => step.classList.remove('active')); // Hide all steps
    stepsArray[stepIndex].classList.add('active'); // Show the current step
    const progress = progressPercentages[stepIndex] || 0;
    progressBar.style.width = `${progress}%`; // Update progress bar
    progressLabel.textContent = `${progress}% Complete`; // Update progress text
  }

  // Handle "Next" button clicks to show next step
  nextButtons.forEach((button) => {
    button.addEventListener('click', function () {
      currentStep++;
      if (currentStep < stepsArray.length) {
        showStep(currentStep);
      }
    });
  });

  // Initially show the first step
  showStep(currentStep);
});


// // Progress bar elements
// document.addEventListener("DOMContentLoaded", function () {
//   const steps = document.querySelectorAll('.step'); // All form steps
//   const nextButtons = document.querySelectorAll('.next-step'); // "Next" buttons
//   const progressBar = document.getElementById('progress'); // Progress bar element
//   const progressLabel = document.getElementById('progress-label'); // Label showing percentage
//   let currentStep = 0; // Current step index

//   // Calculate progress percentages based on number of steps
//   const totalSteps = steps.length;
//   const stepsArray = Array.from(steps);
//   const progressPercentages = stepsArray.length > 1 ? stepsArray.map((_, i) => Math.round(((i + 1) / totalSteps) * 100)) : [100];
  
//   // Function to show the current step and update progress bar
//   function showStep(stepIndex) {
//     steps.forEach(step => step.classList.remove('active')); // Hide all steps
//     steps[stepIndex].classList.add('active'); // Show the current step
//     const progress = progressPercentages[stepIndex] || 0;
//     progressBar.style.width = `${progress}%`; // Update progress bar
//     progressLabel.textContent = `${progress}% Complete`; // Update progress text
//   }

//   // Handle "Next" button clicks to show next step
//   nextButtons.forEach((button) => {
//     button.addEventListener('click', function () {
//       currentStep++;
//       if (currentStep < steps.length) {
//         showStep(currentStep);
//       }
//     });
//   });

//   // Initially show the first step
//   showStep(currentStep);
// });
// Progress bar elements