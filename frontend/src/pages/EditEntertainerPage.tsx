import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { getEntertainer, updateEntertainer } from '../api/EntertainerAPI';
import EntertainerForm from '../components/EntertainerForm';

const EditEntertainerPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEntertainer = async () => {
      try {
        const data = await getEntertainer(Number(id));
        setEntertainer(data);
      } catch (err) {
        setError('Failed to load entertainer details.');
      } finally {
        setLoading(false);
      }
    };

    loadEntertainer();
  }, [id]);

  const handleSubmit = async (updated: Entertainer) => {
    try {
      await updateEntertainer(Number(id), updated);
      navigate('/entertainers');
    } catch {
      alert('Update failed. Try again.');
    }
  };

  if (loading) return <p>Loading entertainer...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!entertainer) return <p>No entertainer found.</p>;

  return (
    <div className="container mt-4">
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate('/entertainers')}
      >
        ← Back to List
      </button>
      <h2 className="mb-4">Edit Entertainer</h2>
      <EntertainerForm initialData={entertainer} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditEntertainerPage;
