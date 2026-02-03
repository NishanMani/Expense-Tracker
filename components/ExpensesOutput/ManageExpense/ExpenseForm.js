import React from 'react';
import {useState} from 'react';
import { View, Text, StyleSheet ,Alert} from 'react-native';
import Input from '../ManageExpense/input';
import Button from '../UI/Button';
import { useContext } from 'react';
import { ExpensesContext } from '../../../store/expenses-context';  
import { getFormattedDate } from '../../../util/date';


function ExpenseForm({submitButtonLabel,onCancel,onSubmit, defaultValues}) {
    const[inputValue,setInputValue]=useState({
        amount:defaultValues ? defaultValues.amount.toString() : '',
        date:defaultValues ? getFormattedDate(defaultValues.date) : '',
        description:defaultValues ? defaultValues.description : '',
    }); 

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValue((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      
      Alert.alert('Invalid input', 'Please check your input values');
      return;
    }


    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputValue.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: 'DD-MM-YYYY',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputValue.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,

            onChangeText: inputChangedHandler.bind(this, 'description'),
            value: inputValue.description,
        }}
      />
       <View style={styles.buttons}>
              <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
              <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
   buttons: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  button:{
    minWidth:120,
    marginHorizontal:8,
  },
});
