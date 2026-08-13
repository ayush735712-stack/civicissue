import React from 'react';
import { Check, Clock, AlertCircle, UserCheck, ShieldCheck } from 'lucide-react';
import { formatDate, getStatusStepIndex } from '../../utils/formatters';
import './StatusTimeline.css';

const TIMELINE_STEPS = [
  { key: 'Reported', label: 'Reported', icon: AlertCircle, desc: 'Issue registered in CivicFix platform' },
  { key: 'Assigned', label: 'Assigned', icon: UserCheck, desc: 'Assigned to Municipal Department' },
  { key: 'In Progress', label: 'In Progress', icon: Clock, desc: 'Maintenance team actively working on site' },
  { key: 'Resolved', label: 'Resolved', icon: ShieldCheck, desc: 'Fix verified and issue closed' }
];

export const StatusTimeline = ({ currentStatus, timelineLogs = [] }) => {
  const currentStepIdx = getStatusStepIndex(currentStatus);

  // Map timeline log entries by status key for easy lookup of date & notes
  const logsByStatus = (timelineLogs || []).reduce((acc, log) => {
    acc[log.status] = log;
    return acc;
  }, {});

  return (
    <div className="status-timeline-container">
      <h4 className="timeline-title">Resolution Timeline</h4>
      <div className="timeline-wrapper">
        {TIMELINE_STEPS.map((step, index) => {
          const isCompleted = index <= currentStepIdx;
          const isCurrent = index === currentStepIdx;
          const logData = logsByStatus[step.key];
          const StepIcon = step.icon;

          return (
            <div
              key={step.key}
              className={`timeline-step ${isCompleted ? 'step-completed' : ''} ${isCurrent ? 'step-current' : ''}`}
            >
              {/* Connector line */}
              {index < TIMELINE_STEPS.length - 1 && (
                <div
                  className={`timeline-connector ${index < currentStepIdx ? 'connector-active' : ''}`}
                />
              )}

              {/* Node indicator */}
              <div className="timeline-node">
                {isCompleted && !isCurrent ? (
                  <Check size={16} className="node-icon" />
                ) : (
                  <StepIcon size={16} className="node-icon" />
                )}
              </div>

              {/* Step info */}
              <div className="timeline-content">
                <span className="step-label">{step.label}</span>
                <span className="step-desc">
                  {logData?.note || step.desc}
                </span>
                {logData?.date && (
                  <span className="step-date">
                    {formatDate(logData.date)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
