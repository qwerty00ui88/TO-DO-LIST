let data = JSON.parse(localStorage.getItem('localData'))
  ? JSON.parse(localStorage.getItem('localData'))
  : [];

const ul = document.querySelector('.listAll');
const button = document.querySelector('button');
const textarea = document.querySelector('textarea');
const i = document.querySelectorAll('i');

const convertToDom = (text, check, index) => {
  const li = document.createElement('li');
  const input = document.createElement('input');
  const label = document.createElement('label');
  const i = document.createElement('i');

  li.setAttribute('id', index);
  input.setAttribute('type', 'checkbox');
  input.setAttribute('id', `checkbox_${index}`);
  input.addEventListener('click', handleCheck);
  check ? input.setAttribute('checked', '') : null; // 새로고침 시 check 여부 기억
  label.setAttribute('for', `checkbox_${index}`);
  label.textContent = text;
  i.setAttribute('class', `fa-solid fa-xmark`);
  i.addEventListener('click', deleteLi);

  li.append(input, label, i);
  ul.append(li);
};

button.addEventListener('click', () => {
  if (textarea.value === '') {
    alert('할 일 없어?');
  } else {
    // data와 localStorage 배열에 추가
    data.push({ text: textarea.value, check: false });
    localStorage.setItem('localData', JSON.stringify(data));
    // 새로운 list의 DOM 추가
    convertToDom(textarea.value, false, data.length - 1);
    textarea.value = '';
  }
});

const deleteLi = (e) => {
  // data와 localStorage에서 삭제
  let targetIndex = Number(e.target.parentElement.id);
  data.splice(targetIndex, 1);
  localStorage.setItem('localData', JSON.stringify(data));
  // 리렌더링
  render();
};

const handleCheck = (e) => {
  // data와 localStorage 변경
  let targetIndex = Number(e.target.parentElement.id);
  data[targetIndex].check = e.target.checked;
  localStorage.setItem('localData', JSON.stringify(data));
};

const render = () => {
  // 기존 DOM 삭제
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  // 새로운 DOM 생성
  data.forEach((el, index) => convertToDom(el.text, el.check, index));
};

render();
