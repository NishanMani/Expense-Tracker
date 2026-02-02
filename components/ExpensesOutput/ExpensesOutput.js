import { View,Text, StyleSheet } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

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
  { id: 'e12', description: 'Headphones', amount: 49.99, date: new Date('2022-12-07') },
];



function ExpensesOutput({expenses, expensesPeriod}) {
    return (
       <View style={styles.container}>   
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
            <ExpensesList expenses={DUMMY_EXPENSES} />
       </View>
   );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  }
});