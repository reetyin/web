//    Project 4
//    Name: Rui Yin	
//    Date: Dec 4,2024
//    Description: This JavaScript script enhances a contact form with validation and dynamic styling. It validates user inputs for name, phone, email, and comments, providing error messages for invalid entries. On successful submission, it displays a success message, resets the form, and redirects users to the homepage after a delay.

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('success-message');
    const inputs = form.querySelectorAll('input, textarea');
    const resetButton = form.querySelector('button[type="reset"]');

    // input focus and blur
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.color = '#495057';
        });

        input.addEventListener('blur', function() {
            this.style.backgroundColor = '';
            this.style.color = '';
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        let firstErrorField = null;

        // Reset all error states
        inputs.forEach(input => {
            const errorDiv = input.closest('.form-group').querySelector('.error-message');
            input.classList.remove('error');
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
        });

        for (const input of inputs) {
            if (!validateField(input)) {
                isValid = false;
                if (!firstErrorField) {
                    firstErrorField = input;  
                }
            }
        }
        if (firstErrorField) {
            firstErrorField.focus();
        }

        if (isValid) {
            // Simulated submission success
            successMessage.style.display = 'block';
            form.reset();
            inputs.forEach(input => {
                input.style.backgroundColor = '';
                input.style.color = '';
            });

            // Hide success message after 4 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 4000);

            // Redirect after form submission
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 4000);
        }
    });

    // Clear form and error messages when reset button is clicked
    resetButton.addEventListener('click', function() {
        // Reset form
        form.reset();
        
        // Clear any error messages
        inputs.forEach(input => {
            const errorDiv = input.closest('.form-group').querySelector('.error-message');
            input.classList.remove('error');
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
        // Remove background color and text color
        input.style.backgroundColor = '';
        input.style.color = '';
        });
        // Focus on the first input box
        const firstInput = inputs[0];
    if (inputs.length > 0) {
        firstInput.focus();
    }
    });

    // Validate input field and display or clear error messages          
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';

        // Reset error state
        formGroup.classList.remove('error');
        errorDiv.style.display = 'none';

        // required field check
        if (!field.value.trim()) {
            errorMessage = `${field.placeholder} is required`;
            isValid = false;
        }
        // Validate input based on field type
        else {
            switch (field.id) {
                case 'name':
                    if (!/^[a-zA-Z\s]{2,30}$/.test(field.value.trim())) {
                        errorMessage = 'Please enter a valid name (2-30 letters)';
                        isValid = false;
                    }
                    break;
                
                case 'phone':
                    if (!/^\d{10}$/.test(field.value.replace(/\D/g, ''))) {
                        errorMessage = 'Please enter a valid 10-digit phone number';
                        isValid = false;
                    }
                    break;

                case 'email':
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                        errorMessage = 'Please enter a valid email address';
                        isValid = false;
                    }
                    break;

                case 'comments':
                    if (field.value.trim().length < 10) {
                        errorMessage = 'Please enter at least 10 characters';
                        isValid = false;
                    }
                    break;
            }
        }

        // Show error message
        if (!isValid) {
            formGroup.classList.add('error');
            errorDiv.textContent = errorMessage;
            errorDiv.style.display = 'block';
            field.classList.add('error');
        }

        return isValid;
    }
});
