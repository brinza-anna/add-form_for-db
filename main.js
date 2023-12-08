document.addEventListener('DOMContentLoaded', function () {
  createStudentsApp(document.getElementById('students-app'), 'База данных студентов', key = 'students');
});

(function () {

  let arrayLocal = [];
  let defaultArrayLocal = [{
    dateOfBirth: "1988-09-08",
    faculty: "Java Script Pro",
    finishOfstudy: "2022",
    id: 1,
    name: "Мягкова Мария Михайловна",
    startOfStudy: "2018",
  },
  {
    dateOfBirth: "1996-11-04",
    faculty: "BigData",
    finishOfstudy: "2019",
    id: 2,
    name: "Данилов Даниил Даниловия",
    startOfStudy: "2015"
  },
  {
    dateOfBirth: "2000-02-21",
    faculty: "Java Script Basic",
    finishOfstudy: "2023",
    id: 3,
    name: "Александрова Алексаедра Александровна",
    startOfStudy: "2019"
  },
  {
    dateOfBirth: "1989-09-09",
    faculty: "Информационные технологий",
    finishOfstudy: "2025",
    id: 4,
    name: "Володин Владимир Владимирович",
    startOfStudy: "2021"
  }];


  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.classList.add('title', 'mb-4');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createStudentItemForm() {
    let form = document.createElement('form');
    let formTitle = document.createElement('h3');
    let inputName = document.createElement('input');
    let nameLabel = document.createElement('label');
    let inputFaculty = document.createElement('input');
    let facultyLabel = document.createElement('label');
    let inputDateBirth = document.createElement('input');
    let birthLabel = document.createElement('label');
    let inputStartStudy = document.createElement('input');
    let startStudyLabel = document.createElement('label');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    formTitle.textContent = 'Форма добавления студентов в базу данных'

    nameLabel.textContent = 'Введите Ф. И. O.';
    facultyLabel.textContent = 'Введите название факультета';
    birthLabel.textContent = 'Введите дату рождения';
    startStudyLabel.textContent = 'Введите год начала обучения';

    form.classList.add('insert-form', 'mb-3');

    inputName.classList.add('form-control-sm', 'mb-2', 'mr-1', 'col-6');
    inputFaculty.classList.add('form-control-sm', 'mb-2', 'mr-1', 'col-6');
    inputDateBirth.classList.add('form-control-sm', 'mb-2', 'mr-1', 'col-6');
    inputStartStudy.classList.add('form-control-sm', 'mb-2', 'mr-1', 'col-6');

    inputName.placeholder = 'Ф. И. О.';
    inputFaculty.placeholder = 'Факультет';
    inputDateBirth.placeholder = 'Дата рождения';
    inputStartStudy.placeholder = 'Год начала учебы';

    inputName.setAttribute('reqired', true);
    inputName.setAttribute('minlength', 6);
    inputFaculty.setAttribute('required', true);
    inputFaculty.setAttribute('minlength', 3);
    inputDateBirth.setAttribute('required', true);

    inputStartStudy.setAttribute('required', true);

    inputName.setAttribute('id', 'name')
    inputFaculty.setAttribute('id', 'faculty');
    inputDateBirth.setAttribute('id', 'date-of-birth');
    inputStartStudy.setAttribute('id', 'start');

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    inputName.setAttribute('type', 'text')
    inputFaculty.setAttribute('type', 'text');
    inputDateBirth.setAttribute('type', 'date');
    inputDateBirth.setAttribute('max', `${year - 1}-${month + 1}-${day}`);
    inputStartStudy.setAttribute('type', 'number');
    inputStartStudy.setAttribute('min', '2000');
    inputStartStudy.setAttribute('max', `${new Date().getFullYear()}`);


    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-sm', 'btn-primary', 'ml-5');
    button.textContent = 'Добавить новые данные';
    buttonWrapper.append(button);


    form.append(formTitle);
    form.append(inputName);
    form.append(nameLabel);

    form.append(inputFaculty);
    form.append(facultyLabel);

    form.append(inputDateBirth);
    form.append(birthLabel);

    form.append(inputStartStudy);
    form.append(startStudyLabel);
    form.append(buttonWrapper);

    button.setAttribute('disabled', 'disabled');
    inputName.addEventListener('input', enabledBtn);

    function enabledBtn() {
      if (inputName.value.length > 0) {
        button.removeAttribute('disabled');
      } else {
        button.setAttribute('disabled', 'disabled');
      }
    };

    return {
      form,
      formTitle,
      inputName,
      inputFaculty,
      inputDateBirth,
      inputStartStudy,
      button
    };
  }


  function rerender(users = undefined) {
    const elements = users ? users : arrayLocal;
    document.getElementById('table-body').innerHTML = '';
    elements.map(user => {
      createStudentItem(user);
    })
  }

  function filter(input, value) {
    let newArr = [...arrayLocal];
    switch (input) {
      case 'name':
        newArr = arrayLocal.filter((user) =>
          user.name.toLowerCase().includes(value.toLowerCase())
        );
        break;
      case 'faculty':
        newArr = arrayLocal.filter((user) =>
          user.faculty.toLowerCase().includes(value.toLowerCase())
        );
        break;
      case 'start':
        newArr = arrayLocal.filter((user) => {
          return user.startOfStudy === value
        });
        break;
      case 'end':
        newArr = arrayLocal.filter((user) => {
          return user.finishOfstudy === value
        });
        break;
      default: break;
    }
    if (value === '') {
      newArr = arrayLocal;
    }
    rerender(newArr);
  }

  document.getElementById('search-name').addEventListener('input', function () {
    filter('name', this.value)
  })
  document.getElementById('search-faculty').addEventListener('input', function () {
    filter('faculty', this.value)
  })
  document.getElementById('search-start').addEventListener('input', function () {
    filter('start', this.value)
  })
  document.getElementById('search-end').addEventListener('input', function () {
    filter('end', this.value)
  })


  function sortBy(typeOfsort) {
    switch (typeOfsort) {
      case 'name':
        arrayLocal.sort(sortByName);
        break;
      case 'faculty':
        arrayLocal.sort(sortByFaculty);
        break;
      case 'dob':
        arrayLocal.sort(sortByBirth);
        break;
      case 'course':
        arrayLocal.sort(sortByStartOfStudy);
        break;
      default: break;
    }
    rerender();
  }


  function sortByName(a, b) {
    if (a.name < b.name) { return - 1; }
    if (a.name > b.name) { return 1; }
    return 0;
  }

  function sortByFaculty(a, b) {
    if (a.faculty < b.faculty) { return - 1; }
    if (a.faculty > b.faculty) { return 1; }
    return 0;
  }

  function sortByBirth(a, b) {
    if (new Date(a.dateOfBirth) > new Date(b.dateOfBirth)) { return - 1; }
    if (new Date(a.dateOfBirth) < new Date(b.dateOfBirth)) { return 1; }
    return 0;
  }

  function sortByStartOfStudy(a, b) {
    if (Number(a.startOfStudy) > Number(b.startOfStudy)) { return - 1; }
    if (Number(a.startOfStudy) < Number(b.startOfStudy)) { return 1; }
    return 0;
  }

  document.getElementById('name').addEventListener('click', () => {
    sortBy('name')
  })
  document.getElementById('faculty').addEventListener('click', () => {
    sortBy('faculty')
  })
  document.getElementById('dob').addEventListener('click', () => {
    sortBy('dob')
  })
  document.getElementById('course').addEventListener('click', () => {
    sortBy('course')
  })


  function createStudentItem(user) {
    let tableBody = document.getElementById('table-body')
    let row = document.createElement('tr');
    let name = document.createElement('td');
    let faculty = document.createElement('td');
    let birthday = document.createElement('td');
    let startStudy = document.createElement('td');

    let buttonGroup = document.createElement('td');
    let deleteButton = document.createElement('button');


    row.setAttribute('id', user.id);
    row.append(name, faculty, birthday, startStudy, buttonGroup);


    name.textContent = user.name;
    faculty.textContent = user.faculty;
    birthday.textContent = `${user.dateOfBirth.split('-').reverse().join('.')} (${getAge(user.dateOfBirth)} лет/года)`;
    startStudy.textContent = calcCurrentLearningCourse(user);

    deleteButton.classList.add('btn-sm', 'btn-danger');
    deleteButton.addEventListener('click', deleteStudentItem);
    deleteButton.textContent = 'удалить';

    buttonGroup.append(deleteButton);

    tableBody.append(row);

    return {
      tableBody,
      row,
      name,
      faculty,
      birthday,
      startStudy,
      deleteButton,
      buttonGroup,
    }
  }


  function createItemsFromLS() {
    if (localStorage.getItem('students')) {
      arrayLocal = JSON.parse(localStorage.getItem('students'));
      for (let object of arrayLocal) {
        createStudentItem(object);
      }
    }
  }

  function createDeafultItems() {
    const storageArr = JSON.parse(localStorage.getItem(key));
    if (localStorage.getItem(key) === null || storageArr.length === 0) {
      arrayLocal = defaultArrayLocal;
      localStorage.setItem('students', JSON.stringify(arrayLocal));
      for (let object of arrayLocal) {
        createStudentItem(object);
      }
    }

  }

  function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }


  function deleteStudentItem() {
    if (confirm('Вы уверены?')) {
      const studentId = Number(this.parentElement.parentElement.getAttribute('id'));
      document.getElementById(studentId).remove();
      arrayLocal = JSON.parse(localStorage.getItem('students'));
      const newItems = arrayLocal.filter(object => object.id !== studentId);
      localStorage.setItem('students', JSON.stringify(newItems));
    }
  }


  function calcCurrentLearningCourse(user) {
    const { startOfStudy } = user;
    const actualYear = new Date().getFullYear();
    const actualMonth = new Date().getMonth();

    const course = actualYear - startOfStudy;

    if (course > 4 || (course === 4 && actualMonth > 8)) {
      return ((`${startOfStudy} - ${Number(startOfStudy) + 4} (закончил)`))
    } else if (course === 0 && actualMonth < 8) {
      return ((`${startOfStudy} - ${Number(startOfStudy) + 4} (зачислен)`))
    } else if (actualMonth >= 8 && Number(startOfStudy) === actualYear) {
      return ((`${startOfStudy} - ${Number(startOfStudy) + 4} (1 курс)`))
    } else {
      return (`${startOfStudy} - ${Number(startOfStudy) + 4} (${course} курс)`)
    }
  };


  function createStudentsApp(container, title = 'База данных студентов', key) {
    let studentsAppTitle = createAppTitle(title);
    let studentItemForm = createStudentItemForm();

    container.append(studentsAppTitle);
    container.append(studentItemForm.form);


    createItemsFromLS();

    createDeafultItems();


    studentItemForm.form.addEventListener('submit', function (e) {

      e.preventDefault();


      let LocStorageData = localStorage.getItem(key);
      if (LocStorageData === null) {
        arrayLocal = [];
      } else {
        arrayLocal = JSON.parse(LocStorageData);
      }

      function createObjForArr() {
        const itemObj = {};
        itemObj.name = studentItemForm.inputName.value;
        itemObj.faculty = studentItemForm.inputFaculty.value;
        itemObj.dateOfBirth = studentItemForm.inputDateBirth.value;
        itemObj.startOfStudy = studentItemForm.inputStartStudy.value;
        itemObj.finishOfstudy = String(Number(studentItemForm.inputStartStudy.value) + 4);
        itemObj.id = Math.floor(Math.random() * 15000);
        arrayLocal.push(itemObj);
        return itemObj;
      }

      const user = createObjForArr();

      createStudentItem(user);

      const storageArr = JSON.parse(localStorage.getItem(key));
      if (localStorage.getItem(key) === null || storageArr.length === 0) {
        localStorage.setItem(key, JSON.stringify(defaultArrayLocal));
      }

      localStorage.setItem(key, JSON.stringify(arrayLocal));

      studentItemForm.inputName.value = '';
      studentItemForm.inputFaculty.value = '';
      studentItemForm.inputDateBirth.value = '';
      studentItemForm.inputStartStudy.value = '';
    });
  }
  window.createStudentsApp = createStudentsApp;
})();
