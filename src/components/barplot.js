import React from 'react';
import {Container} from 'reactstrap'
import  {BarChart, Bar, XAxis, YAxis, Label, CartesianGrid, Tooltip, Legend} from 'recharts';
import {conf_mapping} from './conferencemap';

const BarPlot = (props) => {
  let display;
  if(props.data.meta.type === 3) {
    display = [
        <Bar dataKey={props.data.meta.sep_var1} name={conf_mapping[props.data.meta.sep_var1]} fill="#8884d8" />,
        <Bar dataKey={props.data.meta.sep_var2} name={conf_mapping[props.data.meta.sep_var2]} fill="#82ca9d" />
    ];
  }
  else {
    display = <Bar legendType="none" dataKey={props.data.meta.ylabel} fill="#8884d8"/>;
  }
  return(
    <Container className="plot">
      <BarChart width={700} height={400} data={props.data.docs}
        margin={{top: 5, right: 30, left: 20, bottom: 15}}>
        <XAxis tickLine={false} dataKey={props.data.meta.xlabel || props.data.meta.var}>
          <Label offset={-10} position="insideBottom" >
            {props.data.meta.var || "Year"}
          </Label>
        </XAxis>
        <YAxis tickLine={false} axisLine={false}>
          <Label angle={270} position='insideLeft' style={{ textAnchor: 'middle' }}>
            Count
          </Label>
        </YAxis>
        <CartesianGrid vertical={false} strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend layout='vertical'/>
        {/* <Bar legendType="none" dataKey={props.data.meta.ylabel} fill="#8884d8"/> */}
        {display}
      </BarChart>
    </Container>
  )
}

export default BarPlot
