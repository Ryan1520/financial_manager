import React, {useRef, useEffect} from 'react'
import './expensetable.css'
import ClearIcon from '@mui/icons-material/Clear';


const ExpenseTable = ({tableData, tableCat, deleteTransaction, setPopUp, onClickOutside}) => {
  console.log(tableData)
  const tableRef = useRef(null);

  // https://blog.logrocket.com/detect-click-outside-react-component-how-to/
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        onClickOutside && onClickOutside();
        console.log('ok')
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);

  
  return (
    <div className='expensetable-container' >
      <div className="expensetable-wrapper" ref={tableRef}>
        <div className="expensetable-top">
          <h1>{tableCat}</h1>
        </div>
        {/* https://www.w3schools.com/html/html_table_sizes.asp */}
        <div className="expensetable-bottom">
          <table>
            <tr>
              <th>Date</th>
              <th>Categories</th>
              <th>Amount</th>
            </tr>
            {tableData.map(t => (
              <tr>
                <td>{t.date}</td>
                <td>{t.category}</td>
                <td>{t.amount}</td>
                <td>
                  <span 
                  className='row-clear' onClick={() => deleteTransaction(t.id)}>
                    <ClearIcon />
                  </span>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  )
}

export default ExpenseTable