(function initUILigic() {
  const addContactForm = document.querySelector("#add-contact form");
  const removeContactForm = document.querySelector("#remove-contact form");
  const searchContactsForm = document.querySelector("#search-contacts form");
  const listContactsForm = document.querySelector("#list-contacts form");
  const contactName = document.querySelector("#name");
  const contactPhone = document.querySelector("#phone");
  const contactEmail = document.querySelector("#email");
  const id = document.querySelector("#contact-id");
  const query = document.querySelector("#query");
  const numPerPage = document.querySelector("#contacts-per-page");
  const page = document.querySelector("#page");
  const searchResults = document.querySelector("#search-results");
  const listResults = document.querySelector("#list-results");

  addContactForm.addEventListener("submit", function handleAddSubmit(e) {
    e.preventDefault();

    const newContact = {
      name: contactName.value,
      phone: contactPhone.value,
      email: contactEmail.value
    };

    if (myAwesomePhoneBook.add(newContact)) {
      alert("contact added successfully to phone-book");

      e.target.reset();
    } else {
      alert(
        "phone-book is full, can't add any more contacts.. remove some if you want to add more!"
      );
    }
  });

  removeContactForm.addEventListener("submit", function handleRemoveSubmit(e) {
    e.preventDefault();

    if (myAwesomePhoneBook.remove(id.value)) {
      alert("contact deleted successfully from phone-book");

      e.target.reset();
    } else {
      alert("this id doesn't exist in the phone-book!");
    }
  });

  searchContactsForm.addEventListener("submit", function handleSearchSubmit(e) {
    e.preventDefault();

    var results = myAwesomePhoneBook.search(query.value);

    searchResults.textContent = JSON.stringify(results, null, 4);
  });

  listContactsForm.addEventListener("submit", function handleListSubmit(e) {
    e.preventDefault();

    var results = myAwesomePhoneBook.list(+numPerPage.value, +page.value);

    listResults.textContent = JSON.stringify(results, null, 4);
  });

  query.addEventListener("input", function handleQueryInput(e) {
    var results = myAwesomePhoneBook.search(e.target.value);

    searchResults.textContent = JSON.stringify(results, null, 4);
  });
})();
