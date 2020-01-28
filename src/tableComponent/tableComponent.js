export default function ComponentTable(id) {
  const container = document.querySelector(id);
  const addCol = document.createElement('button');
  const addRow = document.createElement('button');
  const delCol = document.createElement('button');
  const delRow = document.createElement('button');

  const addContainer = document.createElement('div');
  const deleteContainer = document.createElement('div');
  const boxesContainer = document.createElement('div');
  const containerTable = document.createElement('div');

  addContainer.classList.add('add-btns-container');
  deleteContainer.classList.add('delete-btns-container');
  boxesContainer.classList.add('boxes-container');
  containerTable.classList.add('container-table');

  addCol.classList.add('add-col', 'add');
  addRow.classList.add('add-row', 'add');
  delCol.classList.add('del-col', 'delete');
  delRow.classList.add('del-row', 'delete');

  addCol.innerText = '+';
  addRow.innerText = '+';
  delCol.innerText = '-';
  delRow.innerText = '-';

  addContainer.append(addCol);
  addContainer.append(addRow);
  deleteContainer.append(delCol);
  deleteContainer.append(delRow);

  containerTable.append(addContainer);
  containerTable.append(deleteContainer);
  containerTable.append(boxesContainer);

  container.append(containerTable);

  let colsCounter = 4;
  let rowsCounter = 4;
  let currentCol = 0;
  let currentRow = 0;
  let left = 0;
  let top = 0;

  const boxFullSize = 52;

  const hideButton = (btn) => {
    const button = btn;
    button.style.display = 'none';
  };
  const showButton = (btn) => {
    const button = btn;
    button.style.display = 'block';
  };

  const createCol = (row, n) => {
    for (let i = 0; i < n; i += 1) {
      const col = document.createElement('div');
      col.classList.add('col');
      row.append(col);
    }
  };

  const createRow = (table, n) => {
    for (let i = 0; i < n; i += 1) {
      const row = document.createElement('div');
      row.classList.add('row');
      createCol(row, colsCounter);
      table.append(row);
    }
  };

  const rowsDataIndex = () => {
    const rows = boxesContainer.querySelectorAll('.row');
    rows.forEach((row, index) => {
      const rowWhitIndex = row;
      rowWhitIndex.dataset.rowIndex = index;
      const cols = row.querySelectorAll('.col');
      cols.forEach((col, i) => {
        const colWhitIndex = col;
        colWhitIndex.dataset.colIndex = i;
      });
    });
  };

  createRow(boxesContainer, rowsCounter);
  rowsDataIndex();

  addRow.addEventListener('click', () => {
    rowsCounter += 1;
    createRow(boxesContainer, rowsCounter - boxesContainer.children.length);
    rowsDataIndex();
  });

  addCol.addEventListener('click', () => {
    colsCounter += 1;
    const rows = boxesContainer.querySelectorAll('.row');
    rows.forEach((row) => {
      createCol(row, colsCounter - row.children.length);
    });
    rowsDataIndex();
  });

  delRow.addEventListener('click', () => {
    const rows = container.querySelectorAll('.row');
    const rowsLength = rows.length - 1;
    rows[currentRow].remove();
    if (rowsLength < 2) {
      hideButton(delRow);
    }
    delRow.style.transform = `translateY(${(rowsLength === currentRow
      ? (rowsLength - 1) * boxFullSize
      : currentRow * boxFullSize
    )}px)`;
    currentRow = (rowsCounter - 1 > currentRow ? currentRow : currentRow - 1);
    rowsCounter -= 1;
    rowsDataIndex();
  });

  delCol.addEventListener('click', () => {
    const rows = container.querySelectorAll('.row');
    const colLength = rows[0].children.length - 1;

    rows.forEach((row) => {
      const cols = row.querySelectorAll('.col');
      row.removeChild(cols[currentCol]);
    });
    if (colLength < 2) {
      hideButton(delCol);
    }
    delCol.style.transform = `translateX(${(colLength === currentCol
      ? (colLength - 1) * boxFullSize
      : currentCol * boxFullSize
    )}px)`;
    currentCol = (colsCounter - 1 > currentCol ? currentCol : currentCol - 1);
    colsCounter -= 1;
    rowsDataIndex();
  });

  container.addEventListener('mouseover', (event) => {
    const colsLength = container.querySelectorAll('.row')[0].children.length;
    const rowsLength = container.querySelectorAll('.row').length;

    if (colsLength > 1) {
      showButton(delCol);
    }
    if (rowsLength > 1) {
      showButton(delRow);
    }
    if (event.target.classList.contains('col')) {
      currentCol = +event.target.dataset.colIndex;
      currentRow = +event.target.parentNode.dataset.rowIndex;
    }

    delRow.style.transform = `translateY(${currentRow * boxFullSize}px)`;
    delCol.style.transform = `translateX(${currentCol * boxFullSize}px)`;
  });

  container.addEventListener('mouseout', () => {
    hideButton(delCol);
    hideButton(delRow);
  });

  const containerMover = (event) => {
    const mousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
    containerTable.style.left = `${mousePosition.x + left}px`;
    containerTable.style.top = `${mousePosition.y + top}px`;
  };

  boxesContainer.addEventListener('mousedown', (event) => {
    const containerTableRect = containerTable.getBoundingClientRect();
    const eventReact = event.target.getBoundingClientRect();
    left = containerTableRect.left - eventReact.left - event.offsetX;
    top = containerTableRect.top - eventReact.top - event.offsetY;

    window.addEventListener('mousemove', containerMover);
  });

  boxesContainer.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', containerMover);
  });
};
