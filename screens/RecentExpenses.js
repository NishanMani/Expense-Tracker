import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { getDateMinusDays } from "../util/date";  
import { ExpensesContext } from "../store/expenses-context";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const sevenDaysAgo = getDateMinusDays(today, 7);

    return (expense.date >= sevenDaysAgo) && (expense.date <= today);
  });

  return (
    <ExpensesOutput expenses={recentExpenses}
     expensesPeriod="Last 7 Days" 
     fallbackText={"No expenses found for the last 7 days."}/>
  );
}

export default RecentExpenses;