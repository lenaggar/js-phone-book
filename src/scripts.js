window.myAwesomePhoneBook = (function initPhoneBook() {
  /*
    Phone Book code
  */
  const PhoneBook = function PhoneBook() {
    this.lookupDB = {};
    this.indicesList = [];
  };

  PhoneBook.prototype = {
    add: function add(contact) {
      /*
        the following line is just to generate a temp id
        ideally it would use a proper GUID here
      */
      const id = Date.now();
      const db = this.lookupDB;
      const list = this.indicesList;
      let index = list.length;

      db[id] = Object.assign(contact, { id: id });
      /*
        the `id` property in the previous line is redundnt
        but I am including it only for the sake of this demo
      */

      list.push(id);

      /*
        the following loop is just for keeping my contacts alphabetically sorted
        I used `insertion sort` to keep it sorted
      */
      while (index > 0) {
        const i = index;
        const j = index - 1;
        const iString = contact.name.toLowerCase();
        const jString = db[list[j]].name.toLowerCase();

        if (!(iString < jString)) {
          return;
        }

        const temp = list[i];
        list[i] = list[j];
        list[j] = temp;

        index--;
      }
    },

    remove: function remove(id) {
      if (this.lookupDB[id]) {
        delete this.lookupDB[id];

        const arr = this.indicesList;
        const i = arr.indexOf(+id);

        this.indicesList = arr.slice(0, i).concat(arr.slice(i + 1));

        return true;
      } else {
        return false;
      }
    },

    search: function search(query) {
      if (isNaN(+query.replace("-", "").trim())) {
        const db = this.lookupDB;
        const list = this.indicesList;

        return list.map(i => db[i]).filter(obj => obj.name.includes(query));
      } else {
        const db = this.lookupDB;
        const list = this.indicesList;

        return list.map(i => db[i]).filter(obj => obj.phone.includes(query));
      }
    },

    list: function list(contactsPerPage, page) {
      const db = this.lookupDB;
      const list = this.indicesList;
      const begin = contactsPerPage * page;
      const end = begin + contactsPerPage;

      return list.slice(begin, end).map(i => db[i]);
    }
  };

  const myAwesomePhoneBook = new PhoneBook();

  // mock data
  // [
  //   "ahmad",
  //   "mody",
  //   "amr",
  //   "tolba",
  //   "omar",
  //   "fawzy",
  //   "haitham",
  //   "eslam",
  //   "suzy",
  //   "jana",
  //   "ziad",
  //   "basma",
  //   "esraa",
  //   "kamal",
  //   "loay",
  //   "yara",
  //   "ikram",
  //   "um ghada",
  //   "pasant",
  //   "wael",
  //   "qamareddin",
  //   "rahaf",
  //   "sara",
  //   "dina",
  //   "hany",
  //   "celin",
  //   "xander",
  //   "fat7i",
  //   "vladimir",
  //   "bosh",
  //   "natalie"
  // ].forEach((name, i) => {
  //   setTimeout(function() {
  //     myAwesomePhoneBook.add({
  //       name,
  //       phone: "00-000-0000",
  //       email: "a@z.co"
  //     });
  //   }, i * 100);
  // });

  return myAwesomePhoneBook;
})();
