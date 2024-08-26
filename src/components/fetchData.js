

export async function fetchBook(isbn) {
  try { 
    const weatherRes = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );

    if (!weatherRes.ok) {
      return new Error('Network issude!');
    }

    const bookData = await weatherRes.json();

  console.log(bookData);
  
    return { status: true, data: bookData };
    
  } catch (err) {
    alert('Fetching book data failed dude to ', err.message);
    return { status: false, data: null };
    
  }
}