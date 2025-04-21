import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center w-100">
      <h1 className="mb-3">Welcome to the Entertainment Agency</h1>
      <p className="mb-4">
        Your one-stop solution for entertainment management.
      </p>
      <Link to="/entertainers">
        <button className="btn btn-primary">Enter Site</button>
      </Link>
    </div>
  );
};

export default LandingPage;
