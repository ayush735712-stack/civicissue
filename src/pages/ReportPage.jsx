import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Copy, Search, Home } from 'lucide-react';
import { useComplaints } from '../hooks/useComplaints';
import { IssueForm } from '../components/forms/IssueForm';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import './ReportPage.css';

export const ReportPage = () => {
  const navigate = useNavigate();
  const { addComplaint } = useComplaints();
  const [createdComplaint, setCreatedComplaint] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleFormSubmit = (formData) => {
    const newIssue = addComplaint(formData);
    setCreatedComplaint(newIssue);
  };

  const handleCopyId = () => {
    if (createdComplaint?.id) {
      navigator.clipboard.writeText(createdComplaint.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="report-page animate-fade-in">
      <div className="container page-container">
        <div className="report-header text-center">
          <h1 className="page-title">Citizen Reporting Portal</h1>
          <p className="page-subtitle">
            Submit infrastructure issues with location pin & photo evidence. Your report goes directly to city maintenance units.
          </p>
        </div>

        <div className="report-form-wrapper">
          <IssueForm onSubmitSuccess={handleFormSubmit} />
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={!!createdComplaint}
        onClose={() => setCreatedComplaint(null)}
        title="Report Submitted Successfully!"
        maxWidth="520px"
      >
        {createdComplaint && (
          <div className="success-modal-content">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={48} className="success-icon" />
            </div>

            <h3>Thank You for Improving Your City!</h3>
            <p className="success-message">
              Your civic complaint has been registered in the system. Use your tracking ID below to follow repair progress in real-time.
            </p>

            <div className="tracking-id-box">
              <span className="box-label">Your Complaint Tracking ID:</span>
              <div className="id-code-row">
                <code className="id-code">{createdComplaint.id}</code>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={handleCopyId}
                  title="Copy Tracking ID"
                >
                  <Copy size={16} />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="success-meta">
              <div><strong>Category:</strong> {createdComplaint.category}</div>
              <div><strong>Location:</strong> {createdComplaint.location}</div>
              <div><strong>Initial Status:</strong> <span className="status-highlight">Reported</span></div>
            </div>

            <div className="success-modal-actions">
              <Button
                variant="outline"
                icon={Home}
                onClick={() => navigate('/')}
              >
                Go to Home
              </Button>
              <Button
                variant="primary"
                icon={Search}
                onClick={() => navigate(`/track?id=${createdComplaint.id}`)}
              >
                Track Status Now
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
