const checkboxList = document.querySelectorAll('.checkbox');
const inputs = document.querySelectorAll('input');
const error = document.querySelector('.error');
const barFill = document.querySelector('.bar-fill');
const barText = document.querySelector('.bar-text');
const tasks = JSON.parse(localStorage.getItem('tasks')) || {
  input1: {
    selected: false,
    content: '',
  },
  input2: {
    selected: false,
    content: '',
  },
  input3: {
    selected: false,
    content: '',
  },
};

const prePopulate = () => {
  if (localStorage.getItem('tasks')) {
    inputs.forEach((input) => {
      input.value = tasks[input.id]['content'];
    });
    checkboxList.forEach((checkbox) => {
      if (tasks[checkbox.nextElementSibling.id]['selected']) {
        checkbox.classList.add('selected');
        checkbox.nextElementSibling.classList.add('completed');
        checkbox.nextElementSibling.disabled = true;
      }
    });
  }
};

prePopulate();

const checkError = () => {
  let completed = 0,
    selected = 0;
  for (const key of Object.keys(tasks)) {
    if (tasks[key]['content']) {
      completed++;
    }
  }
  if (completed === 3) {
    error.textContent = '';
  } else {
    error.textContent = 'Please select all 3 goals!';
  }
};
checkError();

const checkBarFill = () => {
  let selected = 0;
  for (const key of Object.keys(tasks)) {
    if (tasks[key]['selected']) {
      selected++;
    }
  }

  barFill.style.width = `${(selected / 3) * 100}%`;
  barText.textContent = `${selected}/3 Completed`;
};
checkBarFill();

checkboxList.forEach((checkbox) => {
  checkbox.addEventListener('click', () => {
    if (checkbox.nextElementSibling.value.length > 0) {
      checkbox.classList.toggle('selected');
      checkbox.nextElementSibling.classList.toggle('completed');
      tasks[checkbox.nextElementSibling.id]['selected'] =
        !tasks[checkbox.nextElementSibling.id]['selected'];
      localStorage.setItem('tasks', JSON.stringify(tasks));
      checkBarFill();
    }

    if (tasks[checkbox.nextElementSibling.id]['selected']) {
      checkbox.nextElementSibling.disabled = true;
    } else {
      checkbox.nextElementSibling.disabled = false;
    }
  });
});

inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    if (!tasks[e.target.id]['selected']) {
      tasks[e.target.id]['content'] = e.target.value;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    checkError();
  });
});
