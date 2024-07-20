const checkboxList = document.querySelectorAll('.checkbox');
const cardContainer = document.querySelector('.checkbox-main');
const inputs = document.querySelectorAll('input');
const error = document.querySelector('.error');

const tasks = {
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

checkboxList.forEach((checkbox) => {
  checkbox.addEventListener('click', () => {
    if (checkbox.nextElementSibling.value.length > 0) {
      checkbox.classList.toggle('selected');
      checkbox.nextElementSibling.classList.toggle('completed');
      tasks[checkbox.nextElementSibling.id]['selected'] =
        !tasks[checkbox.nextElementSibling.id]['selected'];
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
    }

    let completed = true;
    for (const key of Object.keys(tasks)) {
      if (!tasks[key]['content']) {
        completed = false;
      }
    }
    if (completed) {
      error.textContent = '';
    } else {
      error.textContent = 'Please select all 3 goals!';
    }
  });
});
