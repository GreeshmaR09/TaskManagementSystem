import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Styles/Style.css';

function TaskDetails() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleClick = (title) => {
    setSelectedTitle(title);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        setData(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data ? data.slice(startIndex, endIndex) : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedTitle(null);
  };

  return (
    <div className="task-list-container">
      <h1>TaskList</h1>

      {error && <p className="error-message">Error: {error.message}</p>}
      {data && (
        <div>
          <ul className="task-list">
            {currentData.map((todos) => (
              <li key={todos.id} className="task-item">
                <button className='user-button' onClick={() => handleClick(todos.title)}>
                  Task: {todos.title}
                </button>
                {selectedTitle === todos.title && (
                  <div className="task-details">
                    <p>Title: {todos.title}</p>
                    <p>Status: {todos.completed ? "Completed" : "Incomplete"}</p>
                    <p>Assigned User: {todos.userId }</p>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="pagination">
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
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

export default TaskDetails;
