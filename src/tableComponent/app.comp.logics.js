
export function componentTable(id) {

  const container = document.querySelector(id);
  const addCol = document.createElement('button');
  const addRow = document.createElement('button');
  const delCol = document.createElement('button');
  const delRow = document.createElement('button');



  const addContainer = document.createElement('div');
  const deleteContainer = document.createElement('div');
  const boxesContainer = document.createElement('div');

  addContainer.classList.add('add-btns-container');
  deleteContainer.classList.add('delete-btns-container');
  boxesContainer.classList.add('boxes-container');

  addCol.classList.add('add-col', 'add');
  addRow.classList.add('add-row', 'add');
  delCol.classList.add('del-col', 'delete', 'hide');
  delRow.classList.add('del-row', 'delete', 'hide');

  addCol.innerText = '+';
  addRow.innerText = '+';
  delCol.innerText = '-';
  delRow.innerText = '-';



  container.append(addContainer);
  container.append(deleteContainer);
  container.append(boxesContainer);

  addContainer.append(addCol);
  addContainer.append(addRow);
  deleteContainer.append(delCol);
  deleteContainer.append(delRow);


  let colState = 4;
  let rowState = 4;
  let colIndex = 0;
  let rowIndex = 0;

  const boxFullSize = 52

  const addHide = (btn) => btn.classList.add('hide');
  const delHide = (btn) => btn.classList.remove('hide');

  const createBox = (col, n) => {
    for (let i = 0; i < n; i++) {
      let box = document.createElement('div');
      box.classList.add('box');
      col.append(box);
    }
  };



  const createCol = (container, n) => {
    for (let i = 0; i < n; i++) {
      let col = document.createElement('div');
      col.classList.add('col');
      container.append(col);
      createBox(col, rowState);
    }
  };

  createCol(boxesContainer, 4);

  addCol.addEventListener('click', () => {
    colState++;
    createCol(boxesContainer, colState - boxesContainer.children.length);
  });

  addRow.addEventListener('click', () => {
    rowState++;
    let cols = boxesContainer.querySelectorAll('.col');
    cols.forEach(col => {
      createBox(col, rowState - col.children.length);
    });
  });


  delCol.addEventListener('click', () => {
    let cols = container.querySelectorAll('.col');
    cols.forEach((col, index) => {
      if (index === colIndex) {
        col.remove();
      }
    });
    let colsLength = cols.length-1;
    if (colsLength === colIndex) {
      delCol.style.transform = `translateX(${colsLength * boxFullSize - boxFullSize}px)`
    } else {
      delCol.style.transform = `translateX(${colIndex * boxFullSize}px)`
    }
    if (colsLength < 2) {
      addHide(delCol);
    }
    (colState -1 > colIndex ? colIndex : colIndex--) 
    colState--;
  });

  delRow.addEventListener('click', () => {
    let cols = container.querySelectorAll('.col');
    cols.forEach((col) => {
      let boxes = col.querySelectorAll('.box');
      col.removeChild(boxes[rowIndex]);
    });
    let rowLength = cols[0].children.length -1;

    if (rowLength < 1) {
      addHide(delRow);
    }
    

    if (rowLength+1 === rowIndex) {
      delRow.style.transform = `translateY(${rowLength * boxFullSize}px)`
    } else {
      delRow.style.transform = `translateY(${(rowIndex) * boxFullSize}px)`
    }
    (rowState -1 > rowIndex ? rowIndex : rowIndex--) 
    rowState--;
    
  });

  container.addEventListener('mouseover', (event) => {

    let cols = container.querySelectorAll('.col');
    delHide(delCol);
    delHide(delRow);
    if (cols.length < 2) {
      addHide(delCol);
    } else {
      delHide(delCol);
    }

    cols.forEach((col, index) => {

      if (col.children.length < 2) {
        addHide(delRow);
      } else {
        delHide(delRow);
      }

      if (event.target.parentNode === col) {
        colIndex = index;
        delCol.style.transform = `translateX(${index * boxFullSize}px)`
        let boxes = col.querySelectorAll('.box');

        boxes.forEach((box, i) => {
          if (event.target === box) {
            rowIndex = i;
            delRow.style.transform = `translateY(${i * boxFullSize}px)`
          }
        });
      }
    });
  });

  container.addEventListener('mouseout', () => {
    addHide(delCol);
    addHide(delRow);
  });
};