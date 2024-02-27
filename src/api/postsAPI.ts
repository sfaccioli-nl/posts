export function getPosts() {
  return fetch("https://jsonplaceholder.typicode.com/posts").then(
    handleResponse
  );
}

function handleResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
