// Budgets

export async function fetchApiBudgets() {
  try {
    const response = await fetch("http://localhost:4000/budgets", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw console.error(error);
  }
}

export async function sendBudgetForm(
  budgetName: string,
  categoryType: string[],
  categoryLimit: string[],
  categoryColor: string[],
  categoryDescription: string[]
) {
  try {
    const response = await fetch("http://localhost:4000/budgets/create", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        "budget-name": budgetName,
        "category-type": categoryType,
        "category-limit": categoryLimit,
        "category-color": categoryColor,
        "category-description": categoryDescription,
      }),
    });
    return response;
  } catch (error) {
    throw console.error(error);
  }
}

export async function deleteBudget(budgetId: string) {
  try {
    const response = await fetch(
      `http://localhost:4000/budgets/${budgetId}/delete`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        // body:
      }
    );
    return response;
  } catch (error) {
    throw console.error(error);
  }
}

// Transactions

export async function sendTransactionsForm(
  transactionType: string | undefined,
  date: string | undefined,
  category: string | undefined,
  amount: string | undefined,
  description: string | undefined,
  categoryId?: string | null
) {
  let body;
  if (categoryId) {
    body = JSON.stringify({
      type: transactionType,
      date: date,
      category: category,
      amount: amount,
      description: description,
      categoryId: categoryId,
    });
  } else {
    body = JSON.stringify({
      type: transactionType,
      date: date,
      category: category,
      amount: amount,
      description: description,
    });
  }

  try {
    const response = await fetch("http://localhost:4000/transactions/create", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: body,
    });
    return response;
  } catch (error) {
    throw console.error(error);
  }
}

export async function updateTransaction(
  transactionId: string,
  transactionType: string | undefined,
  date: string | undefined,
  category: string | undefined,
  amount: string | undefined,
  description: string | undefined,
  categoryId?: string | null
) {
  let body;
  if (categoryId) {
    body = JSON.stringify({
      type: transactionType,
      date: date,
      category: category,
      amount: amount,
      description: description,
      categoryId: categoryId,
    });
  } else {
    body = JSON.stringify({
      type: transactionType,
      date: date,
      category: category,
      amount: amount,
      description: description,
    });
  }
  console.log('transactionId', transactionId)
  console.log('categoryId', categoryId)
  try {
    const response = await fetch(
      `http://localhost:4000/transactions/${transactionId}`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: body,
      }
    );
    return response;
  } catch (error) {
    throw console.error(error);
  }
}

export async function fetchApiTransactions() {
  try {
    const response = await fetch("http://localhost:4000/transactions", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw console.error(error);
  }
}

export async function deleteTransaction(
  transactionId: string,
  categoryId?: string
) {
  let body;
  if (categoryId) {
    body = JSON.stringify({
      categoryId: categoryId,
    });
  } else {
    body = "";
  }
  try {
    const response = await fetch(
      `http://localhost:4000/transactions/${transactionId}/delete`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: body,
      }
    );
    return response;
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${error}`);
  }
}
