var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab


function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    // document.getElementById("prevBtn").style.visibility = "hidden";
    document.getElementById("prevBtn").style.display = "none";
  } else {
    // document.getElementById("prevBtn").style.visibility = "";
    document.getElementById("prevBtn").style.display = "";
  }

  if (n == 0) {
    document.getElementById("nextBtn").innerHTML = 'เริ่มกรอกแบบสอบถาม <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 18 18"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>';
  }
  else if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-save" viewBox="0 0 18 18"><path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/></svg> บันทึกข้อมูล';
    var b = document.querySelector("#nextBtn");
    b.setAttribute("data-bs-target", "#exampleModal");
    b.setAttribute("data-bs-toggle", "modal");
    b.setAttribute("onclick", "");
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
      form.classList.remove('was-validated')
    })
    
  } else {
    document.getElementById("nextBtn").innerHTML = 'ถัดไป <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 18 18"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>';
    var b = document.querySelector("#nextBtn");
    b.setAttribute("data-bs-target", "");
    b.setAttribute("data-bs-toggle", "");
    b.setAttribute("onclick", "nextPrev(1)");
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
      form.classList.remove('was-validated')
    })

  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)




  var current_progress = (currentTab / (x.length - 1)) * 100;
  $("#dynamic")
  .css("width", current_progress + "%")
  .attr("aria-valuenow", current_progress)
  .text(current_progress.toFixed() + "% Complete");








}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()){
  
    return false;
    
  }
  

  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
 if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].querySelectorAll("input[type=number],select,input[type=text]");

  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (((y[i].value == "") || (!y[i].checkValidity()))) {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      swal("กรุณากรอกข้อมูลให้ครบถ้วน", "", "warning");
      const forms = document.querySelectorAll('.needs-validation')
      Array.from(forms).forEach(form => {

        form.classList.add('was-validated')
      })


      // and set the current valid status to false
      valid = false;
    }
  }








  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

