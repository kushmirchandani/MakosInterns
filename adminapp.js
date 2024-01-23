document.addEventListener('DOMContentLoaded', function () {
    const adminContainer = document.getElementById("adminContainer");
    const pinForm = document.getElementById("pinForm");
    const adminForm = document.getElementById("adminForm");
    const successNotification = document.getElementById("successNotification");

    const adminPin = "1234"; // Replace with your hardcoded pin

    function checkAdminPin() {
        const enteredPin = document.getElementById("adminPin").value;
        if (enteredPin === adminPin) {
            pinForm.style.display = "none";
            adminForm.style.display = "block";
        } else {
            alert("Incorrect PIN. Please try again.");
        }
    }

    function submitAdminForm(studentID) {
        var formData = new FormData();
        formData.append("studentID", studentID);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://script.google.com/macros/s/AKfycbxAmPfR-S5j2QE_bT3hT0x5pTfc70-V21m3wvs43AXCwZZ7awly1ErW4a0uKVdO-MUDgQ/exec", true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                document.getElementById("receivedMessage").style.display = "block";
                successNotification.style.display = "block";
                setTimeout(function () {
                    successNotification.style.display = "none";
                }, 1500);
            } else {
                console.error("Error:", xhr.responseText);
            }
        };
        xhr.send(formData);
    }

    function autoSubmitForm(inputField) {
        const studentID = inputField.value;

        if (/^\d{7}$/.test(studentID)) {
            submitAdminForm(studentID);
            inputField.form.reset();
        }
    }

    const studentIDInput = document.getElementById("studentID");

    studentIDInput.addEventListener("input", function () {
        autoSubmitForm(studentIDInput);
    });

    adminForm.addEventListener("submit", function (event) {
        event.preventDefault();
    });
});
