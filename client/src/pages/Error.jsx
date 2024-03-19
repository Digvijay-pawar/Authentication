import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="orange" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
            <path d="M8.523 1.912c.642-1.11 2.175-1.11 2.817 0l5.598 9.688c.69 1.195-.154 2.712-1.409 2.712H4.334c-1.255 0-2.1-1.517-1.409-2.712L8.523 1.912zM8 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.935 6.546c-.308.533-1.045.533-1.353 0l-3.531-6.094C4.096 4.901 4.516 4 5.23 4h5.54c.714 0 1.134.901.619 1.452l-3.531 6.094zM8.5 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>
          <h1 className="mt-3">404 - Not Found</h1>
          <p>This page is temporarily unavailable.</p>
          <Link to="/" className="btn btn-primary">Go Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
