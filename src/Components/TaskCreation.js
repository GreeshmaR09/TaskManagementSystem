import axios from 'axios';
import React, { useState } from 'react';
import '../Styles/TaskCreation.css';
// ... (other imports)

function TaskCreation() {
    const [postData, setPostData] = useState({
      title: '',
      body: '',
      userId: 1,
    });
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setPostData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handlePostRequest = async () => {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', postData);
  
        setIsModalOpen(true);
        setModalContent(`Task posted successfully! ID: ${response.data.id}`);
  
        // Clear input fields
        setPostData({
          title: '',
          body: '',
          userId: 1,
        });
      } catch (error) {
        setIsModalOpen(true);
        setModalContent('Error posting task. Please try again.');
        console.error('Error posting data:', error);
      }
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setModalContent('');
    };
  
    return (
      <div className="task-creation-container">
        <h1>Create a Task</h1>
        <label className="form-label">
          Title:
          <input type="text" name="title" value={postData.title} onChange={handleInputChange} />
        </label>
        <label className="form-label">
          Body:
          <textarea name="body" value={postData.body} onChange={handleInputChange} />
        </label>
        <button className="submit-button" onClick={handlePostRequest}>
          Post Task
        </button>
  
        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content">
              <span className="close-btn" onClick={closeModal}>
                &times;
              </span>
              <p>{modalContent}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default TaskCreation;
  