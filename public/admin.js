async function main() {
    try {
        let response = await fetch('http://localhost:3001/listBooks');
        let books = await response.json();
        books.forEach(renderBook);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function renderBook(book) {
    let root = document.querySelector('#root');

    let li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'justify-content-between');

    li.textContent = book.title;

    let quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = book.quantity;
    quantityInput.classList.add('form-control', 'mx-2');
    quantityInput.style.width = '80px';

    let saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('btn', 'btn-primary');

    saveButton.addEventListener('click', async () => {
        if (!Number.isInteger(parseInt(quantityInput.value, 10)) || parseInt(quantityInput.value, 10) < 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        try {
            let response = await fetch('http://localhost:3001/updateBook', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: book.id,
                    quantity: parseInt(quantityInput.value, 10)
                })
            });

            if (response.ok) {
                alert('Quantity updated successfully!');
            } else {
                alert('Failed to update quantity. Please try again.');
            }
        } catch (error) {
            console.error('Error updating book:', error);
        }
    });

    li.append(quantityInput, saveButton);
    root.append(li);
}

main();
