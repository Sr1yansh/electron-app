// frontend/renderer.js
document.addEventListener('DOMContentLoaded', () => {
       const applyFiltersBtn = document.getElementById('applyFiltersBtn');
       
       applyFiltersBtn.addEventListener('click', () => {
              console.log("check this apo=====1=")
         const toDate = document.getElementById('toDate').value;
         const fromDate = document.getElementById('fromDate').value;
         const buisness = document.getElementById('business').value;
         const supplier = document.getElementById('supplier').value;
         const outlet = document.getElementById('outlet').value;
         const documentType = "bill";
         const limit = Number.MAX_SAFE_INTEGER
     
         const filtersData = {
           toDate,
           fromDate,
           buisness,
           supplier,
           outlet,
           documentType,
           limit
         };
     
         fetch('http://localhost:3000/fetch-bills', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(filtersData)
         })
         .then(response => response.text())
         .then(data => console.log(data))
         .catch(error => console.error('Error:', error));
       });
     });
     