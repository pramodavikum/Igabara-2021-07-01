import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { Paper } from '@material-ui/core'
import { Form,Row,Col } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default class CreateFeedback extends Component {

    constructor(props){
        super(props);

        
        this.onChangeGusetName=this.onChangeGusetName.bind(this);
        this.onChangeigabaraHouse=this.onChangeigabaraHouse.bind(this);
        this.onChangePackage=this.onChangePackage.bind(this);
        this.onChangePackagerate=this.onChangePackagerate.bind(this);
        this.onChangeFood=this.onChangeFood.bind(this);
        this.onChangeMessage=this.onChangeMessage.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

    this.state={
        
        guest:'',
        igabara:'',
        packagename:'',
        packagerate:'',
        food:'',
        message:'',
        packagenames:[],
    }
}

componentDidMount(){
    axios.get('http://localhost:5000/package/')
    .then(response=>{
        if(response.data.length>0){
          this.setState({
            packagenames:response.data.map(user=>user.packagename),
            packagename:response.data[0].packagename
          })
        }
    })

  }

        
        onChangeGusetName(e){
        this.setState({
            guest:e.target.value
        });
        }
        onChangeigabaraHouse(e){
        this.setState({
            igabara:e.target.value
        });
        }
        onChangePackage(e){
        this.setState({
            packagename:e.target.value
        });
        }
        onChangePackagerate(e){
            this.setState({
                packagerate:e.target.value
            });
            }

        onChangeFood(e){
        this.setState({
            food:e.target.value
        });
        }

        onChangeMessage(e){
            this.setState({
                message:e.target.value
            });
            }
        

 onSubmit(e){
     e.preventDefault();

     const exercise={
         
        guest:this.state.guest,
        igabara:this.state.igabara,
        packagename:this.state.packagename,
        packagerate:this.state.packagerate,
        food:this.state.food,
        message:this.state.message,
     }
     console.log(exercise);

     axios.post('http://localhost:5000/feedback/add',exercise)
         .then(res=>console.log(res.data));
         {alert('Send Feedback Successfully');}
    
 }



    render() {
        const paperStyle={padding :20,height:'120vh',width:1100, margin:"20px auto"}
        const StyledRating = withStyles({
            iconFilled: {
              color: '#ff6d75',
            },
            iconHover: {
              color: '#ff3d47',
            },
          })(Rating);
          
        return (
            <div>
                <Paper elevation={10} style={paperStyle}>
                <h3>Feedback Section</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      
                      
                    </div>


                             <div className="form-group">
                                <label>Guest Name</label>
                                <input type="text"
                                
                                className="form-control"
                                value={this.state.guest}
                                onChange={this.onChangeGusetName}
                                />
                            </div>

                            <div className="form-group">
                                <Row>
                                    <Col>
                                <label>Igabara House</label>
                                </Col>

                                <Col>
                                <Form.Check
                                    type="radio"
                                    label="Brown igabara"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                    value="brown"
                                    color="brown"
                                    onChange={this.onChangeigabaraHouse}
                                    />
                                      <Form.Check
                                    type="radio"
                                    label="Pink igabara"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                    value="pink"
                                    color="pink"
                                    onChange={this.onChangeigabaraHouse}
                                    />
                                    <Form.Check
                                    type="radio"
                                    label="Green igabara"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                    value="green"
                                    color="primary"
                                    onChange={this.onChangeigabaraHouse}
                                    />
                                    </Col>
                                    </Row>
                            </div>

                            <div className="form-group">
                                <label> Selected Package </label>
                                <Row>
                                    <Col>
                                <TextField
                            id="packagename" label="Last Name" variant="outlined" fullWidth  style={{ margin: 8 }}
                            select
                            label="Package Name"
                            value={this.state.packagename}
                            onChange={this.onChangePackage}
                            
                            >
                            {this.state.packagenames.map((user) => (
                                <MenuItem  key={user}
                                value={user}>{user}
                                {user.label}
                                </MenuItem>
                            ))}
                            </TextField>  
                            </Col>
<Col>
                            <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Custom icon and color</Typography>
        <StyledRating
          name="customized-color"
          defaultValue={2}
          getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
          precision={0.5}
          value={this.state.packagerate}
        onChange={this.onChangePackagerate}
          icon={<FavoriteIcon fontSize="inherit" />}
        />
      </Box>
      </Col>
      </Row>
                            </div>

                            <div className="form-group">
                                <label>Selected Food</label>
                                <input 
                                type="text"
                                className="form-control"
                                value={this.state.food}
                                onChange={this.onChangeFood}
                                />

                                                                                        <Box component="fieldset" mb={3} borderColor="transparent">
                                                                                        <Typography component="legend">Controlled</Typography>
                                                                                        <Rating
                                                                                        name="simple-controlled"
                                                                                        value={this.state.food}
                                                                                        onChange={this.onChangeFood}
                                                                                        />
                                                                                        </Box> 
                            </div>

                            <div className="form-group">
                                <label>Message </label><br></br>
                               
                                 <TextField
                                    id="outlined-multiline-static"
                                    label="Message"
                                    multiline
                                    rows={4}
                                    defaultValue="Default Value"
                                    variant="outlined"
                                    value={this.state.message}
                                    onChange={this.onChangeMessage}
                                    />
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Send Feedback" className="btn btn-primary"/>
                             
                            </div>

                </form>

    
                </Paper>
            </div>
        )
    }
}
