
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CenterForm from '../components/CenterForm.jsx';
import { AlertMessage } from '../components/Feedback.jsx';
import {
  centerApi,
  getErrorMessage
} from '../services/centerApi.js';

export default function AddPage() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdCenter, setCreatedCenter] = useState(null);

  const addCenter = async (centerData) => {
    setSaving(true);
    setError('');

    try {
      // Send the center details to the existing Spring Boot API.
      const result = await centerApi.add(centerData);

      // Store the response returned by the backend.
      setCreatedCenter(result);

      // Display the custom success modal.
      setShowSuccess(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const goToOverview = () => {
    setShowSuccess(false);
    navigate('/');
  };

  return (
    <>
      {/* Error feedback */}
      {error && (
        <AlertMessage
          type="danger"
          onClose={() => setError('')}
        >
          {error}
        </AlertMessage>
      )}

      {/* Add center form */}
      <div className="panel-card form-card">
        <div className="panel-card-header">
          <div className="form-heading-icon">
            <i className="bi bi-shop-window" />
          </div>

          <div>
            <h2>Register a new center</h2>
            <p>
              Enter the details below to register your pet
              grooming center.
            </p>
          </div>
        </div>

        <CenterForm
          key={showSuccess ? 'submitted' : 'new-center'}
          submitLabel="Add Center"
          onSubmit={addCenter}
          busy={saving}
        />

        <div className="form-bottom-note">
          <i className="bi bi-shield-check" />
          Your center details will be saved to the backend database.
        </div>
      </div>

      {/* Custom success modal — NOT window.alert() */}
      {showSuccess && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="center-success-title"
          style={{
            backgroundColor: 'rgba(30, 27, 50, 0.65)',
            zIndex: 2000
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content border-0"
              style={{
                borderRadius: '22px',
                boxShadow: '0 25px 80px rgba(0,0,0,0.25)',
                overflow: 'hidden'
              }}
            >
              <div
                className="modal-body text-center"
                style={{ padding: '38px 30px 32px' }}
              >
                {/* Success icon */}
                <div
                  className="mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: '82px',
                    height: '82px',
                    borderRadius: '50%',
                    backgroundColor: '#e3f8ed',
                    color: '#21966c',
                    fontSize: '40px',
                    marginBottom: '22px'
                  }}
                >
                  <i className="bi bi-check-lg" />
                </div>

                {/* Success message */}
                <h2
                  id="center-success-title"
                  style={{
                    fontSize: '23px',
                    fontWeight: 800,
                    color: '#292d3b',
                    marginBottom: '12px'
                  }}
                >
                  Center Added Successfully!
                </h2>

                <p
                  style={{
                    fontSize: '13px',
                    color: '#85899a',
                    lineHeight: 1.8,
                    marginBottom: '20px'
                  }}
                >
                  Your pet grooming center has been registered
                  successfully.
                </p>

                {/* Show the saved center ID when returned by backend */}
                {createdCenter && (
                  <div
                    className="mx-auto"
                    style={{
                      backgroundColor: '#f5f3ff',
                      borderRadius: '12px',
                      padding: '13px 16px',
                      marginBottom: '24px',
                      maxWidth: '280px'
                    }}
                  >
                    <div
                      style={{
                        color: '#85809c',
                        fontSize: '11px',
                        marginBottom: '5px'
                      }}
                    >
                      REGISTERED CENTER
                    </div>

                    <div
                      style={{
                        color: '#6252cf',
                        fontSize: '15px',
                        fontWeight: 700
                      }}
                    >
                      {createdCenter.centerName}
                    </div>

                    <div
                      style={{
                        color: '#777b8d',
                        fontSize: '12px',
                        marginTop: '5px'
                      }}
                    >
                      Center ID: #{createdCenter.id}
                    </div>
                  </div>
                )}

                {/* Navigate only when the user clicks this button */}
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={goToOverview}
                  style={{
                    padding: '13px 20px',
                    fontSize: '13px',
                    fontWeight: 700,
                    borderRadius: '10px',
                    backgroundColor: '#6857d7',
                    borderColor: '#6857d7'
                  }}
                >
                  Go to Overview
                  <i className="bi bi-arrow-right ms-2" />
                </button>

                <div
                  style={{
                    color: '#a0a2b0',
                    fontSize: '11px',
                    marginTop: '14px'
                  }}
                >
                  Your center details have been submitted.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
