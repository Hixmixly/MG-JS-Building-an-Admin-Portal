async function main(){
    let books = await fetch('http://localhost:3001/listBooks')
    let booksJSON = await books.json ()
    
    console.log(booksJSON)
    
booksJSON.forEach(function(book){
    let div = document.createElement('div')
    div.innerHTML = 
        <img src = "${book.imageURL}" width = "200" />
        <h3 id = "title-${book.id}"></h3>
        <p>Year published: ${book.year}</p>
        <p>Quantitiy: ${book.quantity}</p>
        <input id= "${book.id}" type= "text" />
        <input type ="submit" onclick = "changeTitle(${book.id})" /> 

        document.body.append(div)
})
    

}
main()


async function changeTitle(id){
    let input = document.getElementById(id)
    let value = input.value

let response = await fetch('http//localhost:3001/updateBook',{
    method: 'Post' ,
    headers: {
        'Content-Type': 'application/json'

    },
    body: JSON.stringify9({
        id: id, 
        title: value
    })
})
let responseJSON = await response.json()
console.log(responseJSON)

}