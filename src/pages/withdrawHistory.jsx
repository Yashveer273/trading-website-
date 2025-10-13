import React from 'react';
import { Clock, CheckCircle, XCircle, Copy, ArrowLeft } from 'lucide-react';
import "./withdrawHistory.css"
import { useLocation, useNavigate } from 'react-router-dom';

// --- END MOCKS ---


// Utility function for copying text (standard practice in these projects)
const copyToClipboard = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy'); 
    console.log('Text copied to clipboard:', text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
  document.body.removeChild(textarea);
};



// --- Mock Data (Aligned with the user's Mongoose Schema structure) ---


// Component for a single Withdrawal List Item
const WithdrawalItem = ({ record }) => { 
      
    // Use record.status, and capitalize it for display
    const statusDisplay = record.status.charAt(0).toUpperCase() + record.status.slice(1);
    const statusClass = `status-${statusDisplay}`; // e.g., status-Pending
    
    // Format ISO date string into a readable format
    const formatDate = (isoString) => {
        try {
            const date = new Date(isoString);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return "Invalid Date";
        }
    };

    // Determine which icon to show based on the status (now using lowercase record.status)
    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved':
                return <CheckCircle style={{ width: '1rem', height: '1rem' }} />;
            case 'rejected':
                return <XCircle style={{ width: '1rem', height: '1rem' }} />;
            case 'pending':
            default:
                return <Clock style={{ width: '1rem', height: '1rem' }} />;
        }
    };

    return (
        <div className="withdrawal-item"> 
            <div className="withdrawal-header"> 
                {/* Amount */}
                <div className="withdrawal-amount"> 
                        ₹{record.amount.toLocaleString('en-IN')}
                </div>
                
                {/* Status Badge - uses capitalized status for the class names */}
                <div className={`withdrawal-status ${statusClass}`}> 
                    {getStatusIcon(record.status)} {statusDisplay} 
                </div>
            </div>
            
            {/* Date Row */}
            <div className="withdrawal-info-row"> 
                <span>Date:</span>
                <span className="withdrawal-info-value">{formatDate(record.date)}</span>
            </div>
            
            {/* Reference Number Row with Copy Button (using mock refId now) */}
            <div className="withdrawal-info-row"> 
                <span>Ref ID:</span>
                <div className="utr-copy-group">
                    <span className="utr-text">{record.refId}</span>
                    <button
                        onClick={() => copyToClipboard(record.refId)}
                        className="copy-btn"
                        title="Copy Reference ID"
                        style={{ color: "var(--bright-orange)" }}
                    >
                        <Copy style={{ width: '0.8rem', height: '0.8rem' }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Component for the Withdrawal History list view
const WithdrawalHistory = () => { 
    const navigate=useNavigate();
    const location = useLocation();
    const data = location.state || [];
    // The component expects the header type to be present on location object (mocked above)
    const type = location.type || "Withdraw History";
      
    const totalAmount = (Array.isArray(data) ? data : []).reduce((sum, record) => sum + (record.amount || 0), 0);
    
  

    return (
        <div className="app-container"> {/* Using app-container from CSS for centering */}
          <div className="maincontent"> {/* Using main-content from CSS for width constraint */}
            
            {/* Header */}
            <div className="header">
                {/* Back Button (mocked navigation) */}
                <button 
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="chevron-icon" />
                </button>
                   <div className="header-title-group">
                    <h2>{type} </h2>
                    <p className="total-display">Total Amount: 
                        <span style={{ color: "var(--bright-orange)", fontWeight: '700', marginLeft: '0.25rem' }}>
                            ₹{totalAmount.toLocaleString('en-IN')}
                        </span>
                    </p>
                </div>

            </div>
            
            {/* List of Records */}
            <div className="contentpadding withdrawal-history-list"> 
                {data.length > 0 ? (
                    data.map((record, index) => (
                        <WithdrawalItem key={index} record={record} /> 
                    ))
                ) : (
                    <p className="no-records-message">No withdrawal records found.</p> 
                )}
            </div>
          </div>
        </div>
    );
};


export default WithdrawalHistory; 


