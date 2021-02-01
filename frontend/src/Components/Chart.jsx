import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';
import axios from 'axios';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart() {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const data = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}allInvesting`);
      const list = response.data.reduce((result, row) => {
        const obj = createData(row["time"], row["amount"]);
        result.push(obj);
        return result;
      }, []);
      setChartData(list);
    }
    data();
  }, [])

  return (
    <React.Fragment>
      <Title align="center">Today</Title>
      <ResponsiveContainer >
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis padding={{ left: 0 }} dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} >
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Investing ($)
            </Label>
          </YAxis>
          <Tooltip></Tooltip>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}