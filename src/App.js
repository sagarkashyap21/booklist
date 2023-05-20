import React,{useState, useEffect} from 'react'
import { View } from './component/View';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('books');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  // main array of objects state || books state || books array of objects
  const [books, setbooks]=useState(getDatafromLS());

  // input field states
  const [title, setTitle]=useState('');
  const [author, setAuthor]=useState('');
  const [isbn, setIsbn]=useState('');
  const [year, setyear]=useState('');

  // form submit event
  const handleAddBookSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let book={
      title,
      author,
      year,
      isbn
    }
    setbooks([...books,book]);
    setTitle('');
    setAuthor('');
    setyear('');
    setIsbn('');
  }

  // delete book from LS
  const deleteBook=(isbn)=>{
    const filteredBooks=books.filter((element,index)=>{
      return element.isbn !== isbn
    })
    setbooks(filteredBooks);
  }

  const updateBook=(isbn)=>{
    let update=books.filter((v,ind)=>{
      return isbn===v.isbn;
    })
    let u=update[0];
    setTitle(u.title);
    setAuthor(u.author);
    setyear(u.year);
    setIsbn(u.isbn);
    deleteBook(isbn);
    
  }
  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('books',JSON.stringify(books));
  },[books])

  return (
    <div className='wrapper'>
      <h1>BookList App</h1>
      <p style={{fontSize:"1.2rem"}}>Add and view your books </p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddBookSubmit}>
            <label>Title</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setTitle(e.target.value)} value={title}></input>
            <br></br>
            <label>Author</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setAuthor(e.target.value)} value={author}></input>
            <br></br>
            <label>Published year</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setyear(e.target.value)} value={year}></input>
            <br></br>
            <label>ISBN#</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setIsbn(e.target.value)} value={isbn}></input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
        </div>

        <div className='view-container'>
          {books.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>ISBN#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published year</th>
                    <th></th>
                    <th >Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View books={books} deleteBook={deleteBook} updateBook={updateBook}/>
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
            onClick={()=>setbooks([])}>Remove All</button>
          </>}
          {books.length < 1 && <div>No books are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App