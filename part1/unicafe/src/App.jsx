import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text}: {value} {text === "Positive" && "%"}
      </td>
    </tr>
  );
};

const Statistics = ({ stats }) => {
  const total = stats.good + stats.neutral + stats.bad;
  const average = (stats.good - stats.bad) / total;
  const positive = (stats.good / total) * 100;

  if (total === 0) {
    return (
      <tr>
        <td>No feedback given.</td>
      </tr>
    );
  }
  return (
    <>
      <StatisticsLine text={"Good"} value={stats.good} />
      <StatisticsLine text={"Neutral"} value={stats.neutral} />
      <StatisticsLine text={"Bad"} value={stats.bad} />
      <StatisticsLine text={"All"} value={total} />
      <StatisticsLine text={"Average"} value={average} />
      <StatisticsLine text={"Positive"} value={positive} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodFeedback = () => setGood(good + 1);
  const neutralFeedback = () => setNeutral(neutral + 1);
  const badFeedback = () => setBad(bad + 1);

  const feedbackStats = {
    good: good,
    neutral: neutral,
    bad: bad,
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <td colSpan="3">
              <Header text={"Give Feedback"} />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Button handleClick={goodFeedback} text={"Good"} />
            </td>
            <td>
              <Button handleClick={neutralFeedback} text={"Neutral"} />
            </td>
            <td>
              <Button handleClick={badFeedback} text={"Bad"} />
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <td>
              <Header text={"Statistics"} />
            </td>
          </tr>
        </thead>
        <tbody>
          <Statistics stats={feedbackStats} />
        </tbody>
      </table>
    </>
  );
};

export default App;
