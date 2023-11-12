import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alarm = () => {
  const empId = localStorage.getItem('empId');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(`/api/message/test/${empId}`);

    eventSource.onmessage = (event) => {
      toast.info('새로운 쪽지 도착');
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
    };

    return () => {
      eventSource.close();
    };
  }, []);


  return (
      <div>
        <ToastContainer
            hideProgressBar
        />
      </div>
  );
};

export default Alarm;