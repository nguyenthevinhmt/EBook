export const category = [
    { label: 'Văn học', value: 1 },
    { label: 'Toán học', value: 2 }
]

export const formatDateDDMMYYYY = (inputDateString) => {
    // Create a Date object from the input string
  const date = new Date(inputDateString);

  // Get day, month, and year components
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  // Concatenate components with hyphens for "DD-MM-YYYY" format
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
  }