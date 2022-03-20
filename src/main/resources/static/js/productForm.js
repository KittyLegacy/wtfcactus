const productsControl = new ProductsController();
var storeImage = ""


newItemForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();
  
    const newItemNameInput = document.querySelector('#newItemNameInput');
    const newItemImageUrl = document.querySelector('#newItemImageFile');
    const newItemStyle = document.querySelector('#newItemStyle');
    const newItemPrice = document.querySelector('#newItemPrice');
    

    
    const name = newItemNameInput.value;
    const style = newItemStyle.value;
    const imageUrl =  newItemImageUrl.value.replace("C:\\fakepath\\", "");
    const price = newItemPrice.value;

    // Clear the form
    newItemNameInput.value = '';
    newItemImageUrl.value = '';
    newItemStyle.value = '';
    newItemPrice.value = '';

    
    productsControl.addItem(name, imageUrl, style, price, storeImage);

});

const input = document.querySelector('#newItemImageFile');

input.addEventListener('change', () => {
    storeImage = input.files[0];
});
