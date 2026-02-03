import {createContext, useReducer} from 'react';

const DUMMY_EXPENSES = [
  { id: 'e1', description: 'A pair of shoes', amount: 59.99, date: new Date('2022-12-19') },
  { id: 'e2', description: 'A pair of trousers', amount: 89.29, date: new Date('2022-12-17') },
  { id: 'e3', description: 'Some bananas', amount: 5.99, date: new Date('2022-12-16') },
  { id: 'e4', description: 'A book', amount: 14.99, date: new Date('2022-12-15') },
  { id: 'e5', description: 'Another book', amount: 18.59, date: new Date('2022-12-14') },
  { id: 'e6', description: 'A carpet', amount: 99.99, date: new Date('2022-12-13') },
  { id: 'e7', description: 'Coffee', amount: 3.49, date: new Date('2022-12-12') },
  { id: 'e8', description: 'Groceries', amount: 45.75, date: new Date('2022-12-11') },
  { id: 'e9', description: 'Movie ticket', amount: 12.00, date: new Date('2022-12-10') },
  { id: 'e10', description: 'Bus pass', amount: 25.00, date: new Date('2022-12-09') },
  { id: 'e11', description: 'Mobile recharge', amount: 19.99, date: new Date('2022-12-08') },
  { id: 'e12', description: 'Headphones', amount: 49.99, date: new Date('2026-01-31') },
];



export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, data}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, data}) => {}
}); 

function expensesReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({type: 'ADD', payload: expenseData});
    }

    function updateExpense(id, expenseData) {
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense
    };

    return <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>
}   

export default ExpensesContextProvider;