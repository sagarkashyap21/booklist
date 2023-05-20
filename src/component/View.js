import React from 'react'
import { Icon } from 'react-icons-kit'
import { trash } from 'react-icons-kit/feather/trash'
import { edit } from 'react-icons-kit/feather/edit'

export const View = ({ books, deleteBook,updateBook }) => {

    return books.map(book => (

        <tr key={book.isbn}>
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td>edit item <Icon className="updatebtn" icon={edit} onClick={()=>updateBook(book.isbn)} /></td>
            <td className='delete-btn' onClick={() => deleteBook(book.isbn)}>
                <Icon  icon={trash} />
            </td>
        </tr>

    ))
}