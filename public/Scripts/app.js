//Assignment: Assignment 2 Express Portfolio – Authentication 
// Laura Amangeldiyeva - student id: 301167661 
// Date: 2022/02/15

//Immediately Invoked Function Expression
(function(){

  function Start()
  {
      console.log("Processing...");

    let deleteButtons = document.querySelectorAll('.btn-danger')

    for(button of deleteButtons)
    {
      button.addEventListener('click', (event) => {
        if(!confirm("You sure about that?"))
        {
          event.preventDefault();
          window.location.assign('/contacts-list');
        }

      });
    }
  }


window.addEventListener("load", Start);  

})();