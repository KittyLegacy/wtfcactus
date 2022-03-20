const createHTMLList = (index, name, imageURL) =>
`

<div class="col-lg-4 d-flex mt-5 justify-content-around">
<div class="card card-hover border-0" style="width: 30rem;">
  <a id="${index}" href="#" data-toggle="modal" data-target="#productModal">
<img src=${imageURL} class="card-img-top"
    alt="image">
    </a>
<div class="card-body">
    <h5 class="card-title">${name}</h5>
</div>
</div>
</div>

`;


function displayProductDetails(item)
{
    document.querySelector("#modalName").innerText = item.name;
    document.querySelector("#modalImg").src = item.imageUrl;
    document.querySelector("#modalStyle").innerText = item.style;
    document.querySelector("#modalPrice").innerText = item.price;

}


class ProductsController 
{
    constructor()
    {
        this._items = [];       
    }

    addItem(name, imageUrl, style, price, imageObject)
    {
            var productController = this;
                   const formData = new FormData();
                   formData.append('name', name);
                   formData.append('imageUrl', imageUrl);
                   formData.append('style', style);
                   formData.append('price', price);
                   formData.append('imagefile',imageObject);

                  //fetch('http://localhost:8080/item/add', {
                  fetch('https://wtfcactus.herokuapp.com/item/add', {
                        method: 'POST',
                        body: formData
                        })
                        .then(function(response) {
                            console.log(response.status); // Will show you the status
                            if (response.ok) {
                                alert("Successfully Added Product!")
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            alert("Error adding item to Product")
                        });

    }


displayItem()
    {
        var productController = this;
        productController._items = [];

                fetch('https://wtfcactus.herokuapp.com/item/all')
                    .then((resp) => resp.json())
                    .then(function(data) {
                        console.log("2. receive data")
                        console.log(data);
                        data.forEach(function (item, index) {

                            const itemObj = {
                                id: item.id,
                                name: item.name,
                                imageUrl: item.imageUrl,
                                style: item.style,
                                price: item.price
                           };
                            productController._items.push(itemObj);
                      });

                      productController.renderProductPage();

                    })
                    .catch(function(error) {
                        console.log(error);
                    });


    }

    renderProductPage()
    {
        var productHTMLList = [];
        
        for (var i=0; i<this._items.length; i++)
        {
            const item = this._items[i];           

            const productHTML = createHTMLList(i, item.name, item.imageUrl);

            productHTMLList.push(productHTML);
        }

        const pHTML = productHTMLList.join('\n');
        document.querySelector('#row').innerHTML = pHTML;

        for (var i=0; i<this._items.length; i++)
        {
            const item = this._items[i];
            document.getElementById(i).addEventListener("click", function() { displayProductDetails(item);} );
        }


    }


}   //End of ProductsController class
