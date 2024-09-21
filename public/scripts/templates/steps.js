document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll('.step'); // All form steps
  const nextButtons = document.querySelectorAll('.next-step'); // "Next" buttons
  const prevButtons = document.querySelectorAll('.prev-step'); // "Back" buttons
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
    progressLabel.textContent = `${progress}% завршен`; // Update progress text
  }

  // Handle "Next" button clicks to show next step
  nextButtons.forEach((button) => {
    button.addEventListener('click', function () {
      if (currentStep < stepsArray.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  // Handle "Back" button clicks to show previous step
  prevButtons.forEach((button) => {
    button.addEventListener('click', function () {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  // Initially show the first step
  showStep(currentStep);
});