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
  containerTable.classList.add('container');

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

  let colsCounter = 5;
  let rowsCounter = 5;
  let currentCol = 0;
  let currentRow = 0;

  const boxFullSize = 52

  const hideButton = (btn) => {
    btn.style.display = 'none';
  };
  const showButton = (btn) => {
    btn.style.display = 'block';
  };

  const createCol = (row, n) => {
    for (let i = 0; i < n; i++) {
      let col = document.createElement('div');
      col.classList.add('col');
      row.append(col);
    }
  };

  const createRow = (container, n) => {
    for (let i = 0; i < n; i++) {
      let row = document.createElement('div');
      row.classList.add('row');
      createCol(row, colsCounter);
      container.append(row);
    }
  };

  const rowsDataIndex = () => {
    let rows = boxesContainer.querySelectorAll('.row');
    rows.forEach((row, index) => {
      row.dataset.rowIndex = index;
      let cols = row.querySelectorAll('.col');
        cols.forEach((col, index) => col.dataset.colIndex = index)
    })
  }

  createRow(boxesContainer, rowsCounter);
  rowsDataIndex();

  addRow.addEventListener('click', () => {
    rowsCounter++;
    createRow(boxesContainer, rowsCounter - boxesContainer.children.length);  
    rowsDataIndex();
  });

  addCol.addEventListener('click', () => {
    colsCounter++;
    let rows = boxesContainer.querySelectorAll('.row');
    rows.forEach(row => {
      createCol(row, colsCounter - row.children.length);
    });
    rowsDataIndex();
  });


  delRow.addEventListener('click', () => {
    let rows = container.querySelectorAll('.row');
    let rowsLength = rows.length - 1;

    rows[currentRow].remove();

    (rowsLength < 2 ? hideButton(delRow) : showButton(delRow));
    (rowsLength === currentRow ? 
      delRow.style.transform = `translateY(${rowsLength * boxFullSize - boxFullSize}px)` : 
      delRow.style.transform = `translateY(${+currentRow * boxFullSize}px)`);
    (rowsCounter -1 > currentRow ? currentRow : currentRow--);
    rowsCounter--;
    rowsDataIndex();
  });

  delCol.addEventListener('click', () => {
    let rows = container.querySelectorAll('.row');
    let colLength = rows[0].children.length - 1;

    rows.forEach((row) => {
      let cols = row.querySelectorAll('.col');
      row.removeChild(cols[currentCol]);
    });

    (colLength < 1 ? hideButton(delCol) : showButton(delCol));
    (colLength === currentCol ? 
      delCol.style.transform = `translateX(${colLength * boxFullSize - boxFullSize}px)` : 
      delCol.style.transform = `translateX(${currentCol * boxFullSize}px)`);
    (colsCounter -1 > currentCol ? currentCol : currentCol--);
    colsCounter--;
    rowsDataIndex();
  });

  container.addEventListener('mouseover', (event) => {
    showButton(delCol);
    showButton(delRow);
    let rows = container.querySelectorAll('.row');
    (rows[0].children.length < 2 ? hideButton(delCol) : showButton(delCol));
    (rows.length < 2 ? hideButton(delRow) : showButton(delRow));

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


  const containerMover = () => {
    let move = false;
    let left = 0;
    let top = 0;
    

    container.addEventListener('mousedown', (event) => {
      if (!event.target.classList.contains('add') && !event.target.classList.contains('delete')) {
        move = true;
        hideButton(delCol);
        hideButton(delRow);
        hideButton(addCol);
        hideButton(addRow);
        left = container.getBoundingClientRect().left - event.target.getBoundingClientRect().left - event.target.getBoundingClientRect().width / 2;
        top = container.getBoundingClientRect().top - event.target.getBoundingClientRect().top - event.target.getBoundingClientRect().height / 2;
      }
    });

    container.addEventListener('mouseup', () => {
      move = false;
      showButton(addCol);
      showButton(addRow);

      (colsCounter > 1 ? showButton(delCol) : false );
      (rowsCounter > 1 ? showButton(delRow) : false );

    });

    window.addEventListener('mousemove', event => {
      let mousePosition = {
        x:event.clientX,
        y:event.clientY
      }

      if(move) {
        container.style.left = `${mousePosition.x + left}px`; 
        container.style.top = `${mousePosition.y + top}px`;
      }
    });

  };


  containerMover();
}