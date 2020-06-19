import React, { Component } from 'react'
import { Tabs } from "antd";
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util,
    RingProgressChart,
  } from "bizcharts";

import "./index.less";

const {TabPane} = Tabs
const data=[...Array(30).keys()].map((i)=>{
    return{
        key:i+1,
        percent:+Math.random().toFixed(1)
    }
})
const lineData = [
    {
      month: "Jan",
      city: "Tokyo",
      temperature: 6,
    },
    {
      month: "Jan",
      city: "London",
      temperature: 3.7,
    },
    {
      month: "Feb",
      city: "Tokyo",
      temperature: 6.8,
    },
    {
      month: "Feb",
      city: "London",
      temperature: 5.2,
    },
    {
      month: "Mar",
      city: "Tokyo",
      temperature: 8.9,
    },
    {
      month: "Mar",
      city: "London",
      temperature: 5.7,
    },
    {
      month: "Apr",
      city: "Tokyo",
      temperature: 16.5,
    },
    {
      month: "Apr",
      city: "London",
      temperature: 7.8,
    },
    {
      month: "May",
      city: "Tokyo",
      temperature: 19.1,
    },
    {
      month: "May",
      city: "London",
      temperature: 12.3,
    },
    {
      month: "Jun",
      city: "Tokyo",
      temperature: 22.5,
    },
    {
      month: "Jun",
      city: "London",
      temperature: 14.7,
    },
    {
      month: "Jul",
      city: "Tokyo",
      temperature: 24.2,
    },
    {
      month: "Jul",
      city: "London",
      temperature: 16,
    },
    {
      month: "Aug",
      city: "Tokyo",
      temperature: 27.3,
    },
    {
      month: "Aug",
      city: "London",
      temperature: 22.6,
    },
    {
      month: "Sep",
      city: "Tokyo",
      temperature: 21.4,
    },
    {
      month: "Sep",
      city: "London",
      temperature: 14.2,
    },
    {
      month: "Oct",
      city: "Tokyo",
      temperature: 17.3,
    },
    {
      month: "Oct",
      city: "London",
      temperature: 10.3,
    },
    {
      month: "Nov",
      city: "Tokyo",
      temperature: 13.9,
    },
    {
      month: "Nov",
      city: "London",
      temperature: 9.6,
    },
    {
      month: "Dec",
      city: "Tokyo",
      temperature: 8.5,
    },
    {
      month: "Dec",
      city: "London",
      temperature: 5.8,
    },
  ];
   

export default class Static extends Component {
    render() {
        return (
            <div className="static">
                <Tabs style={{ height: 600 }}>
                    {data.map((item)=>(
                        <TabPane tab={
                            <div>
                                <h3>store{item.key}</h3>
                                <RingProgressChart width={30} height={30} percent={item.percent}/>
                            </div>
                        }key={item.key}>
                            <Chart height={400} data={lineData} autoFit>
                                <Legend position="top" />
                                <Axis name="month" />
                                <Axis name="temperature" label={{formatter: (val) => `${val}°C`,}}/>
                                <Tooltip crosshairs={{type:'y'}}/>
                                <Geom 
                                type="line"
                                position="month*temperature"
                                size={2}
                                color={"city"}
                                shape={"smooth"}/>
                                <Geom
                                type="point"
                                position="month*temperature"
                                size={4}
                                shape={"circle"}
                                color={"city"}
                                style={{ stroke: "#fff",lineWidth: 1,}}/>
                            </Chart>
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        )
    }
}
