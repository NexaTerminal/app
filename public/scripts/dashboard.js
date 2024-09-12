document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('main-header');
    const mobileMenu = document.getElementById('mobile-menu');
    const mainContent = document.querySelector('main');
  
    // Create a new container for the dashboard layout
    const dashboardContainer = document.createElement('div');
    dashboardContainer.className = 'dashboard-container';
  
    // Create the dashboard nav and move the nav items
    const dashboardNav = document.createElement('nav');
    dashboardNav.className = 'dashboard-nav';
    const originalNav = header.querySelector('nav');
    if (originalNav) {
        const navItems = originalNav.querySelector('ul.nav-items');
        if (navItems) {
            dashboardNav.appendChild(navItems);
        }
        originalNav.remove();
    }
  
    // Create a new div for the dashboard content
    const dashboardContent = document.createElement('div');
    dashboardContent.className = 'dashboard-content';
  
    // Move the main content into the dashboard content div
    while (mainContent.firstChild) {
        dashboardContent.appendChild(mainContent.firstChild);
    }
  
    // Append nav and content to the dashboard container
    dashboardContainer.appendChild(dashboardNav);
    dashboardContainer.appendChild(dashboardContent);
  
    // Replace the main content with the new dashboard layout
    mainContent.parentNode.replaceChild(dashboardContainer, mainContent);
  
    // Hide the original header and mobile menu
    header.style.display = 'none';
    if (mobileMenu) {
        mobileMenu.style.display = 'none';
    }
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.nav-section');
  
    sections.forEach(section => {
        const title = section.querySelector('.nav-title');
        const dropdownMenu = section.querySelector('.dropdown-menu');
  
        let hideTimeout = null;
  
        // Handle showing the dropdown
        const showDropdown = () => {
            if (hideTimeout) {
                clearTimeout(hideTimeout); // Cancel any scheduled hiding
            }
            dropdownMenu.style.display = 'block';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.transform = 'translateX(0)';
        };
  
        // Handle hiding the dropdown
        const hideDropdown = () => {
            hideTimeout = setTimeout(() => {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.transform = 'translateX(-20px)';
                // Delay hiding the display to allow for the transition to complete
                setTimeout(() => {
                    dropdownMenu.style.display = 'none';
                }, 300); // Adjust this to match the CSS transition duration
            }, 300); // Delay before hiding (optional to give smoother UX)
        };
  
        // Toggle dropdown on hover
        section.addEventListener('mouseenter', showDropdown);
  
        section.addEventListener('mouseleave', hideDropdown);
  
        // Ensure that the dropdown stays visible when hovering over it
        dropdownMenu.addEventListener('mouseenter', showDropdown);
        dropdownMenu.addEventListener('mouseleave', hideDropdown);
    });
  });
  
  // Mobile menu toggle functionality
  document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
  
    mobileMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
    });
  });
  
  //Stock exchange bar

  document.addEventListener('DOMContentLoaded', function () {
    // Array of information to be displayed
    const tickerData = [
      { text: "Аукција за продажба на недвижнсот во Скопје", link: "#" },
      { text: "Повик за доставување на понуди до Министерство за еконимија", link: "#" },
      { text: "Оглас за субвенции на практиканти од АВРМ", link: "#" },
      { text: "Објава на Министерство за внатрешни", link: "#" },

      // Add more items as needed
    ];
  
    // Get the ticker container
    const tickerItemsContainer = document.getElementById('ticker-items');
  
    // Create and append ticker items
    tickerData.forEach(item => {
      const tickerItem = document.createElement('div');
      tickerItem.className = 'ticker-item';
      
      // Create the link element
      const link = document.createElement('a');
      link.href = item.link;
      link.textContent = item.text;
      
      // Append the link to the ticker item
      tickerItem.appendChild(link);
      
      // Append the ticker item to the ticker items container
      tickerItemsContainer.appendChild(tickerItem);
    });
  
    // Optional: Explicitly trigger a reflow to ensure CSS animations start
    // This line ensures the animation starts as expected immediately.
    tickerItemsContainer.offsetHeight; // Trigger reflow to start animation immediately
  });
  
//   document.addEventListener('DOMContentLoaded', function() {
//     initTicker();
//   });

//   function initTicker() {
//     const tickerItems = document.getElementById('ticker-items');
//     const items = [
//       'Item 1',
//       'Item 2',
//       'Item 3',
//       'Item 4',
//       'Item 5'
//     ]; // Replace with your actual items

//     // Populate ticker items
//     items.forEach(item => {
//       const span = document.createElement('span');
//       span.textContent = item;
//       span.style.padding = '0 20px';
//       tickerItems.appendChild(span);
//     });

//     // Clone items to create a seamless loop
//     const tickerContent = tickerItems.innerHTML;
//     tickerItems.innerHTML += tickerContent;
//   }
  