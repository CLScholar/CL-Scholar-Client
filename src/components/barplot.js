import React from 'react';
import {Container} from 'reactstrap'
import  {BarChart, Bar, XAxis, YAxis, Label, CartesianGrid, Tooltip, Legend} from 'recharts';

const BarPlot = (props) => {
  // let data;
  // if(this.props.status === 'searched') {
  //   console.log(props.data.docs);
  //   data = props.data.docs;
  //   if(this.props.data.meta.type === 4) {
  //     data = props.data.docs.cit_trend;
  //   }
  // }
  return(
    <Container className="plot">
      <BarChart width={700} height={400} data={props.data.docs}
        margin={{top: 5, right: 30, left: 20, bottom: 15}}>
        <XAxis tickLine={false} dataKey={props.data.meta.xlabel}>
          <Label offset={-10} position="insideBottom" >
            Year
          </Label>
        </XAxis>
        <YAxis tickLine={false} axisLine={false}>
          <Label angle={270} position='insideLeft' style={{ textAnchor: 'middle' }}>
            Papers
          </Label>
        </YAxis>
        <CartesianGrid vertical={false} strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Bar legendType="none" dataKey={props.data.meta.ylabel} fill="#8884d8"/>
      </BarChart>
    </Container>
  )
}

export default BarPlot
