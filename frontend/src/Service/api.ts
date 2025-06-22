export async function sendBudgetForm(
  budgetName: string,
  categoryType: string[],
  categoryLimit: string[],
  categoryColor: string[],
  categoryDescription: string[]
) {
  await fetch("http://localhost:4000/budgets/create", {
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
}

export async function sendTransactionsForm(
  transactionType: string | undefined,
  date: string | undefined,
  category: string | undefined,
  amount: string | undefined,
  description: string | undefined,
  categoryId: string | undefined
) {
  await fetch("http://localhost:4000/transactions/create", {
    method: "POST",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      type: transactionType,
      date: date,
      category: category,
      amount: amount,
      description: description,
      categoryId: categoryId,
    }),
  });
}

export async function fetchApiBudgets() {
    try {
      const response = await fetch("http://localhost:4000/budgets", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      return data
    } catch (error) {
      return console.error(error);
    }
  }

  