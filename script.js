let data = JSON.parse(localStorage.getItem('localData'))
  ? JSON.parse(localStorage.getItem('localData'))
  : [];

const ul = document.querySelector('.listAll');
const button = document.querySelector('button');
const textarea = document.querySelector('textarea');
const i = document.querySelectorAll('i');

const convertToDom = (text, index) => {
  const li = document.createElement('li');
  const input = document.createElement('input');
  const label = document.createElement('label');
  const i = document.createElement('i');

  li.setAttribute('id', index);
  input.setAttribute('type', 'checkbox');
  label.textContent = text;
  i.setAttribute('class', `fa-solid fa-xmark`);
  i.addEventListener('click', deleteLi);

  ul.append(li);
  li.append(input, label, i);
};

button.addEventListener('click', () => {
  if (textarea.value === '') {
    alert('할 일 없어?');
  } else {
    // data와 localStorage 배열에 추가
    data.push(textarea.value);
    localStorage.setItem('localData', JSON.stringify(data));
    // 새로운 list의 DOM 추가
    convertToDom(textarea.value, data.length);
    textarea.value = '';
  }
});

const deleteLi = (e) => {
  // data와 localStorage 배열에서 삭제
  let targetIndex = Number(e.target.parentElement.id);
  data.splice(targetIndex, 1);
  localStorage.setItem('localData', JSON.stringify(data));
  // 리렌더링
  render();
};

const render = () => {
  // 기존 DOM 삭제
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  // 새로운 DOM 생성
  data.forEach((el, index) => convertToDom(el, index));
};

render();
