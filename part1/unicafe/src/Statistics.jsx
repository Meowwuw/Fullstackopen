const Statistics = ({ good, neutral, bad, total, average, positivePercentage }) => {
    return (
      <table>
        <tbody>
          <tr><td>Good</td><td>{good}</td></tr>
          <tr><td>Neutral</td><td>{neutral}</td></tr>
          <tr><td>Bad</td><td>{bad}</td></tr>
          <tr><td>Total</td><td>{total}</td></tr>
          <tr><td>Average</td><td>{average.toFixed(1)}</td></tr>
          <tr><td>Positive</td><td>{positivePercentage.toFixed(1)}%</td></tr>
        </tbody>
      </table>
    );
  };
  
  export default Statistics;
  