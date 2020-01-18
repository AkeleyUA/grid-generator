export const logics = (id) => {
    var counter = 1;
    var container = document.querySelector(`.container-${id}`);
    var addRow = container.querySelector('.add-row');
    var addCol = container.querySelector('.add-col');
    var delRow = container.querySelector('.del-row');
    var delCol = container.querySelector('.del-col');
    var colIndex = 0;
    var rowIndex = 0;

    var createBox = (col, n) => {
        for(let i = 0; i < n; i++) {
            let box = document.createElement('div');
            box.classList.add('box');
            col.append(box);
        }
    };

    var createCol = () => {
        let col = document.createElement('div');
        col.classList.add('col');
        container.append(col);
        createBox(col, counter);
    };


    addCol.addEventListener('click', () => {
        createCol();
        delCol.disabled = false;
    });

    addRow.addEventListener('click', () => {
        counter ++;
        let cols = container.querySelectorAll('.col');
        cols.forEach(col => {
            createBox(col, counter-col.children.length);
        });
    });


    delCol.addEventListener('click', () => {
        let cols = container.querySelectorAll('.col');
        cols.forEach((col, index) => {
            if(index === colIndex) {
                col.remove();
            }
            delCol.style.transform = `translateX(${index*104/2-52}px)`;
            delCol.style.display = "none";
            delRow.style.display = "none";
        });
        if(cols.length <3) {
            delCol.disabled = true;
            delCol.style.display = "none";
        }
    });  

    delRow.addEventListener('click', (event) => {
        let cols = container.querySelectorAll('.col');
        cols.forEach((col, index) => {
            let boxes = col.querySelectorAll('.box');
            col.removeChild(boxes[rowIndex]);
            delRow.style.transform = `translateY(${(boxes.length-1)*104/2-52}px)`;
            delCol.style.display = "none";
            delRow.style.display = "none";

            if(col.children.length <2) {
                delRow.disabled = true;
                delRow.style.display = "none";
            }
        });
        counter--;

    });

    container.addEventListener('mouseover', (event) => {
        let cols = container.querySelectorAll('.col');
            delCol.style.display = 'block';
            delRow.style.display = 'block';

        if(cols.length <2) {
            delCol.disabled = true;
            delCol.style.display = "none";
        } else {
            delCol.disabled = false;
            delCol.style.display = "block";
        }

        cols.forEach((col, index) => {

            if(col.children.length <2) {
                delRow.disabled = true;
                delRow.style.display = "none";
            } else {
                delRow.disabled = false;
                delRow.style.display = "block";
            }

            if (event.target.parentNode === col) {
                colIndex = index;
                delCol.style.transform = `translateX(${index*104/2}px)`
                let boxes = col.querySelectorAll('.box'); 
            
                boxes.forEach((box, i) => {
                    if(event.target === box) {
                        rowIndex = i;
                        delRow.style.transform = `translateY(${i*104/2}px)`
                    }
                });
            }
        });
    });

    container.addEventListener('mouseout', () => {
        delCol.style.display = 'none';
        delRow.style.display = 'none';
    });
};