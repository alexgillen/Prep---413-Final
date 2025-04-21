import React, { useState } from 'react';
import { Entertainer } from '../types/Entertainer';

interface Props {
  initialData?: Entertainer;
  onSubmit: (entertainer: Entertainer) => void;
}

const EntertainerForm: React.FC<Props> = ({ initialData, onSubmit }) => {
  const [form, setForm] = useState<Entertainer>({
    entertainerId: initialData?.entertainerId || 0,
    entStageName: initialData?.entStageName || '',
    entSsn: initialData?.entSsn || '',
    entStreetAddress: initialData?.entStreetAddress || '',
    entCity: initialData?.entCity || '',
    entState: initialData?.entState || '',
    entZipCode: initialData?.entZipCode || '',
    entPhoneNumber: initialData?.entPhoneNumber || '',
    entWebPage: initialData?.entWebPage || '',
    entEmailAddress: initialData?.entEmailAddress || '',
    dateEntered:
      initialData?.dateEntered || new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Stage Name</label>
        <input
          name="entStageName"
          value={form.entStageName}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">SSN</label>
        <input
          name="entSsn"
          value={form.entSsn}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Street Address</label>
        <input
          name="entStreetAddress"
          value={form.entStreetAddress}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">City</label>
        <input
          name="entCity"
          value={form.entCity}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">State</label>
        <input
          name="entState"
          value={form.entState}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Zip Code</label>
        <input
          name="entZipCode"
          value={form.entZipCode}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Phone Number</label>
        <input
          name="entPhoneNumber"
          value={form.entPhoneNumber}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Web Page</label>
        <input
          name="entWebPage"
          value={form.entWebPage}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Email Address</label>
        <input
          name="entEmailAddress"
          value={form.entEmailAddress}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Date Entered</label>
        <input
          type="date"
          name="dateEntered"
          value={form.dateEntered}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EntertainerForm;
