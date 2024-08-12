(() => {
  const list = document.querySelector('#list');
  const input = document.querySelector('#input');
  const insertButton = document.querySelector('#insert-button');
  let editingItem;

  const handleAction = () => {
    let value = input.value.trim();
    if (!value) return;

    if (typeof(editingItem) === 'object') {
      updateItem();
    } else {
      createItem();
    }

    resetEditingState();
  };

  input.addEventListener('keydown', event => {
    if (event.key === 'enter' || event.keyCode === 13) {
      handleAction();
    }
  });
  insertButton.addEventListener('click', handleAction);

  const createItem = () => {
    const item = document.createElement('li');
    item.className = 'list__item d-flex justify-content-between align-items-center';
    item.innerHTML = itemStructure();

    addEventListenersToButtons(item);
    list.appendChild(item);
  };

  const editItem = (item) => {
    editingItem = item;
    input.value = item.querySelector('span').textContent;
    input.focus();
  }

  const updateItem = () => {
    editingItem.querySelector('span').textContent = input.value;
  };

  const deleteItem = (item) => {
    if (item === editingItem) {
      resetEditingState();
    }

    list.removeChild(item);
  }

  const resetEditingState = () => {
    input.value = '';
    editingItem = undefined;
  };

  const addEventListenersToButtons = (item) => {
    const deleteButton = item.querySelector('[name=delete-button]');
    deleteButton.addEventListener('click', event => deleteItem(event.target.closest('li')));

    const editButton = item.querySelector('[name=edit-button]');
    editButton.addEventListener('click', event => editItem(event.target.closest('li')));
  };

  const itemStructure = () => {
    return `<span class="item__text">${input.value}</span>
            <div class="item__buttons">
              <button type="button" class="item__button" name="edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
              </button>
              <button type="button" class="item__button" name="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
              </button>
            </div>
            `;
  };
})();