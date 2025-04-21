import React from 'react';
import { useNavigate } from 'react-router-dom';
import EntertainerForm from '../components/EntertainerForm';
import { addEntertainer } from '../api/EntertainerAPI';
import { Entertainer } from '../types/Entertainer';

const AddEntertainerPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (entertainer: Entertainer) => {
    await addEntertainer(entertainer);
    navigate('/entertainers');
  };

  return (
    <div className="container mt-4">
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate('/entertainers')}
      >
        ← Back to List
      </button>

      <h2 className="mb-4">Add New Entertainer</h2>
      <EntertainerForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEntertainerPage;
