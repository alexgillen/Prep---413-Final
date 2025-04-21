import { useEffect, useState } from 'react';
import { EntertainerStats } from '../types/Entertainer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EntertainerListPage = () => {
  const [entertainers, setEntertainers] = useState<EntertainerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntertainers = async () => {
      try {
        const response = await axios.get(
          'https://413-final-backend-evere3h7c5cge4g2.eastus-01.azurewebsites.net/api/EntertainmentAgency/EntertainerStats'
        );
        setEntertainers(response.data);
      } catch (err) {
        setError('Failed to load entertainers');
      } finally {
        setLoading(false);
      }
    };

    fetchEntertainers();
  }, []);

  if (loading) return <p>Loading entertainers...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <button className="btn btn-primary mb-3" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      <h2 className="mb-4">Entertainers</h2>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Stage Name</th>
            <th>Times Booked</th>
            <th>Last Booking Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entertainers.map((e) => (
            <tr key={e.entertainerId}>
              <td>{e.entStageName}</td>
              <td>{e.bookings}</td>
              <td>{e.lastBooking ? e.lastBooking : '—'}</td>
              <td>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate(`/entertainers/${e.entertainerId}`)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate('/add-entertainer')}
      >
        Add New Entertainer
      </button>
    </div>
  );
};

export default EntertainerListPage;
