import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { getEntertainer, deleteEntertainer } from '../api/EntertainerAPI';

const EntertainerDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntertainer = async () => {
      try {
        const data = await getEntertainer(Number(id));
        setEntertainer(data);
      } catch (err) {
        setError('Failed to load entertainer.');
      } finally {
        setLoading(false);
      }
    };

    fetchEntertainer();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this entertainer?'
    );
    if (!confirmed) return;

    try {
      await deleteEntertainer(Number(id));
      navigate('/entertainers');
    } catch {
      alert('Delete failed. Try again.');
    }
  };

  if (loading) return <p>Loading entertainer...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!entertainer) return <p>No entertainer found.</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{entertainer.entStageName} — Details</h2>
      <div className="mb-3">
        <strong>Entertainer ID:</strong> {entertainer.entertainerId}
      </div>
      <div className="mb-3">
        <strong>SSN:</strong> {entertainer.entSsn || 'N/A'}
      </div>
      <div className="mb-3">
        <strong>Address:</strong> {entertainer.entStreetAddress},{' '}
        {entertainer.entCity}, {entertainer.entState} {entertainer.entZipCode}
      </div>
      <div className="mb-3">
        <strong>Phone:</strong> {entertainer.entPhoneNumber}
      </div>
      <div className="mb-3">
        <strong>Email:</strong> {entertainer.entEmailAddress}
      </div>
      <div className="mb-3">
        <strong>Web Page:</strong> {entertainer.entWebPage}
      </div>
      <div className="mb-3">
        <strong>Date Entered:</strong> {entertainer.dateEntered}
      </div>

      <div className="d-flex gap-2 mt-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/entertainers/${id}/edit`)}
        >
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/entertainers')}
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default EntertainerDetailsPage;
