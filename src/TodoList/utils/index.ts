import { TodoItem } from "../types";

export const getTodoList = async () => {
  try {
      const apiUrl = 'http://localhost:4000/todo';
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error so that the component can handle it if needed
  }
};

export const updateTodoList = async (item: TodoItem) => {
  const apiUrl = `http://localhost:4000/todo/${item.id}?checked=${item.checked}`;
  console.log(apiUrl);
  const response = await fetch(apiUrl, {
    method: 'PUT', // or 'PATCH' depending on your API
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`Failed to update item with id ${item.id}`);
  }
};
