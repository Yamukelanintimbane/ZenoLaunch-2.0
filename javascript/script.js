// Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Dark Mode Toggle
        const themeToggle = document.getElementById('theme-toggle');

        // Check for saved preference or system preference
        function checkThemePreference() {
            const savedTheme = localStorage.getItem('theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
                document.body.classList.add('dark-mode');
                themeToggle.textContent = '☀️';
            } else {
                themeToggle.textContent = '🌙';
            }
        }

        // Toggle Theme
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙';
            }
        });

        // Initialize
        checkThemePreference();

        // Watch for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.body.classList.add('dark-mode');
                    themeToggle.textContent = '☀️ Light Mode';
                } else {
                    document.body.classList.remove('dark-mode');
                    themeToggle.textContent = '🌙 Dark Mode';
                }
            }
        });

        
  function showMessengerPopup(contactMessage) {
    const popup = document.getElementById('messengerRedirectPopup');
    const countdownElement = document.getElementById('countdown');
    const progressBar = document.querySelector('.progress-bar');
    
    // Show popup
    popup.style.display = 'flex';
    setTimeout(() => {
      popup.style.opacity = '1';
      document.querySelector('.popup-content').style.transform = 'translateY(0)';
    }, 10);
    
    // Start countdown
    let seconds = 2;
    countdownElement.textContent = seconds;
    
    // Animate progress bar
    progressBar.style.width = '100%';
    
    const countdownInterval = setInterval(() => {
      seconds--;
      countdownElement.textContent = seconds;
      
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        redirectToMessenger(contactMessage);
        hidePopup();
      }
    }, 1000);
    
    // Cancel button
    document.getElementById('cancelRedirect').addEventListener('click', () => {
      clearInterval(countdownInterval);
      hidePopup();
    });
    
    // Open Now button
    document.getElementById('openNowBtn').addEventListener('click', () => {
      clearInterval(countdownInterval);
      redirectToMessenger(contactMessage);
      hidePopup();
    });
    
    function hidePopup() {
      popup.style.opacity = '0';
      setTimeout(() => {
        popup.style.display = 'none';
      }, 300);
    }
  }


  // Map enquiry types to readable format
        const enquiryTypes = {
            'web-development': 'Web Development',
            'mobile-apps': 'Mobile Apps',
            'ecommerce': 'E-Commerce',
            'business-registration': 'Business Registration',
            'other': 'Other'
        };

       // Use consistent keys without extra spaces
        const plan = {
            'starter': 'Starter Pack (R999)',
            'basic': 'Basic (R1,499)',
            'professional': 'Professional (R3,999)',
            'ecommerce-pro': 'E-Commerce Pro (R4,999)',
            'enterprise': 'Enterprise (R7,499)'
        };

        // Get form data
        function getFormData() {
            return {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                enquiryType: document.getElementById('enquiryType').value,
                plan: document.getElementById('plan').value,
                message: document.getElementById('message').value
            };
        }

                    // Validate form
                    /**
             * Validates the form data before submission.
             * Checks if required fields (name, email, message) are filled.
             * 
             * @returns {boolean} - Returns `true` if validation passes, `false` otherwise.
             */
            function validateForm() {
                // Get form data
                const formData = getFormData();

                // Check for empty fields
                const missingFields = [];
                if (!formData.name?.trim()) missingFields.push("Name");
                if (!formData.email?.trim()) missingFields.push("Email");
                if (!formData.message?.trim()) missingFields.push("Message");

                // If any field is missing, show error and prevent submission
                if (missingFields.length > 0) {
                    showValidationError(`Please fill in all required fields:\n${missingFields.join(", ")}`);
                    return false;
                }

                // Additional validation (e.g., email format)
                if (!isValidEmail(formData.email)) {
                    showValidationError("Please enter a valid email address.");
                    return false;
                }

                // All checks passed
                return true;
            }

            /**
             * Displays a styled error message (replaces default `alert()`).
             * @param {string} message - The error message to display.
             */
            function showValidationError(message) {
                // Create a modal or use a nicer alert (e.g., SweetAlert, Toast, or custom HTML)
                const errorBox = document.createElement("div");
                errorBox.className = "validation-error";
                errorBox.innerHTML = `
                    <div class="error-content">
                        <span class="close-btn">&times;</span>
                        <p>${message}</p>
                    </div>
                `;
                document.body.appendChild(errorBox);

                // Close on button click
                errorBox.querySelector(".close-btn").addEventListener("click", () => {
                    errorBox.remove();
                });

                // Auto-close after 5 seconds
                setTimeout(() => errorBox.remove(), 5000);
            }

            /**
             * Basic email validation.
             * @param {string} email - The email to validate.
             * @returns {boolean} - `true` if valid, `false` otherwise.
             */
            function isValidEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }

        // Messenger button handler
        document.getElementById('messengerBtn').addEventListener('click', function() {
            if (!validateForm()) return;
            
            const formData = getFormData();
            const contactMessage = `📧 New Contact Message\n\n` +
                `👤 Name: ${formData.name}\n` +
                `📧 Email: ${formData.email}\n` +
                `📌 Enquiry Type: ${enquiryTypes[formData.enquiryType]}\n` +
                `💰 plan: ${plan[formData.plan]}\n` +
                `✉️ Message: ${formData.message}`;
            
            // Show success message
            document.getElementById('messengerSuccess').style.display = 'block';
            
            // Redirect to Messenger after delay
            setTimeout(() => {
                window.open(`https://www.messenger.com/t/100010480532647?text=${encodeURIComponent(contactMessage)}`, '_blank');
                document.getElementById('messengerSuccess').style.display = 'none';
            }, 2000);
            
            // Reset form
            document.getElementById('contactForm').reset();
        });

        // Email button handler
        document.getElementById('emailBtn').addEventListener('click', function() {
            if (!validateForm()) return;
            
            const formData = getFormData();
            const subject = `New ${enquiryTypes[formData.enquiryType]} Inquiry | Selected Plan: ${plan[formData.plan]}`;
            const body = `Dear Yamukelani,\n\n ${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`;
            
            
            // Encode for mailto link
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(body);
            
            // Show success message
            document.getElementById('emailSuccess').style.display = 'block';
            
            // Redirect to email client after delay
            setTimeout(() => {
                window.location.href = `mailto:yamukelanintimbane@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
                document.getElementById('emailSuccess').style.display = 'none';
            }, 1000);
            
            // Reset form
            document.getElementById('contactForm').reset();
        });

        // 

        document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.hero-slide');
            let currentSlide = 0;
            
            function nextSlide() {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }
            
            // Change slide every 5 seconds
            setInterval(nextSlide, 5000);
        });
       

        //
         // Auto-select plan when "Get Started" is clicked
        function setSelectedPlan(planValue, planText) {
            document.getElementById("plan").value = planValue;
            
            // Optional: Scroll to form
            document.getElementById("contactForm").scrollIntoView({ behavior: "smooth" });
        }