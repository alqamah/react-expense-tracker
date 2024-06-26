import React, { useEffect, useRef } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ 
  addExpense,
  editExpenseId,
  editExpenseText,
  editExpenseAmount,
  resetEditExpense
}) => {
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();

  // Use the useEffect hook here, to check if an expense is to be updated
  // If yes, then autofill the form values with the text and amount of the expense

  useEffect(() => {
    if (editExpenseId !== null) {
      //console.log("editCLICK",editExpenseId, editExpenseText, editExpenseAmount);
      expenseTextInput.current.value = editExpenseText;
      expenseAmountInput.current.value = editExpenseAmount;
    }
  },[editExpenseId, editExpenseText, editExpenseAmount]);


  const onSubmitHandler = (e) => {
    e.preventDefault();
    const expenseText = expenseTextInput.current.value;
    const expenseAmount = expenseAmountInput.current.value;
    if (parseInt(expenseAmount) === 0) {
      return;
    }

    const expense = {
      text: expenseText,
      amount: expenseAmount,
      id: editExpenseId || new Date().getTime(),
    };
    addExpense(expense);
    clearInput();
    return;

    // Logic to update expense here
  };

  const clearInput = () => {
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
    resetEditExpense();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>{editExpenseId ? "Edit Transaction" : "Add new transaction"}</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense,positive-income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInput}
        required
      />
      <button className={styles.submitBtn}>
        {editExpenseId ? "Edit Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default ExpenseForm;