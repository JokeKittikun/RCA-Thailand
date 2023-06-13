// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');



  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
    
        event.preventDefault()
        event.stopPropagation()
        swal("กรุณากรอกข้อมูลให้ครบถ้วน", "", "warning");

      } else {

          swal("บันทึกข้อมูลสำเร็จ", "", "success").then((value) => {
            window.location = "thankful.html";
            window.location.href = "thankful.html";
          });
      }
       
      
      form.classList.add('was-validated')
      
      
      
    }, false)
  })
})() 




