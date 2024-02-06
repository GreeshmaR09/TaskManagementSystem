import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Styles/Style.css';

function TaskList() {
  // State to hold fetched data, error, selected title, current page, and items per page
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Function to handle button click and set selected title
  const handleClick = (title) => {
    setSelectedTitle(title);
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");

        // Sort the data by timestamp in descending order (LIFO)
        const sortedData = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setData(sortedData);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  // Calculate total pages, start index, end index, and current data for pagination
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data ? data.slice(startIndex, endIndex) : [];

  // Function to handle page change and reset selected title
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedTitle(null);
  };

  return (
    <div className="task-list-container">
      <h1>TaskList</h1>

      {/* Display error message if there's an error */}
      {error && <p className="error-message">Error: {error.message}</p>}
      {data && (
        <div>
          {/* Display task list */}
          <ul className="task-list">
  {currentData.map((todos) => (
    <li key={todos.id} className="task-item">
      {/* Button to select a task */}
      <button
        className='user-button'
        onClick={() => handleClick(todos.title)} >
        Details
      </button>
      <button style={{
          background: todos.completed ? 'lightblue' : '#a64c4c',
          color: 'black', // Set text color to black
        }}  className='user-button' >Task: {todos.title}</button>
      {/* Display details when a task is selected */}
      {selectedTitle === todos.title && (
        <div className="task-details">
          <p>Title: {todos.title}</p>
          <p>Status: {todos.completed ? 'Completed' : 'Incomplete'}</p>
          <p>Assigned User: {todos.userId}</p>
        </div>
      )}
    </li>
  ))}
</ul>


          {/* Pagination controls */}
          <div className="pagination">
            <p>
              Page {currentPage} of {totalPages}
            </p>
            {/* Button to go to the previous page */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            {/* Button to go to the next page */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
