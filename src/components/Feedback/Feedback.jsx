import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FeedbackOptions from '../FeedbackOptions/FeedbackOptions';
import Statistics from '../Statistics/Statistics';
import Section from '../Section/Section';
import Notification from '../Notifications/Notifications';

export const Feedback = () => {
  const [feedback, setFeedback] = useState({});

  const onLeaveFeedback = type => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [type]: prevFeedback[type] ? prevFeedback[type] + 1 : 1,
    }));
  };

  const countTotalFeedback = () => {
    return Object.values(feedback).reduce((total, value) => total + value, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const good = feedback['good'] || 0;
    return total > 0 ? Math.round((good / total) * 100) : 0;
  };

  const hasFeedback = countTotalFeedback() > 0;

  const options = Object.keys(feedback);

  return (
    <div>
      <Section title="Leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      <Section title="Statistics">
        {hasFeedback ? (
          <Statistics
            feedback={feedback}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};

export default Feedback;
