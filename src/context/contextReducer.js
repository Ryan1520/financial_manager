export default (state, action) => {
  let transactions

  switch (action.type) {
    case 'ADD_TRANSACTION':
      //avoid using mutation methods (e.g: push(), splice(),...) for updating state in react
      //Details: https://react.dev/learn/updating-arrays-in-state
      transactions = [...state, action.payload]

      localStorage.setItem('transactions', JSON.stringify(transactions));

      return transactions
    
    case 'DELETE_TRANSACTION':
      transactions = state.filter(t => t.id !== action.payload)

      localStorage.setItem('transactions', JSON.stringify(transactions));

      return transactions
    
    default: 
      return state
  }
}