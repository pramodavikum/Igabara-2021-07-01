import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import { Paper } from '@material-ui/core';
import ChartsNavbBar from './chartNavBar';

function Pie2() {

  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);

  let packagename = [];
  let packagerate = [];
 
  
  useEffect(() => {

    axios.get("http://localhost:5000/feedback").then(res => {

      const feedback = res.data;
      setPosts(feedback);
      //console.log(feedback);
      feedback.forEach(record  => {
        packagename.push(record .packagename);
       //console.log(packagename);
        packagerate.push(record .packagerate);
        //console.log(packagerate);



        const Modifieddata=data.map((feedback)=>({
          packagename:feedback.packagename.total,
          packagerate:feedback.packagerate.total,
          
      }));
      return Modifieddata;







      });

      //foorloop    // count    //total

     

      setData({
        Data: {
          labels: packagename,
          datasets: [
            {
              label: "Package Feedback Rate",
              data: packagerate,
              backgroundColor: [
                "#3cb371",
                "#0000FF",
                "#9966FF",
                "#4C4CFF",
                "#00FFFF",
                "#f990a7",
                "#aad2ed",
                "#FF00FF",
                "Blue",
                "Red"
              ]
            }
          ]
        }
      });
    });
  },[]);
  const paperStyle={padding :20,height:'80vh',width:1000, margin:"20px auto"}
  return (
    <div>
      <Paper elevation={10} style={paperStyle}>
      <div><ChartsNavbBar/></div>
      <Bar data={data.Data}  ></Bar>
      </Paper>
    </div>
  );
}

export default Pie2;