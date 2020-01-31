import React, { Component } from 'react'
import '../styling/ItemCard.css'
// import '../Styling/Header.css'
// import '../App.css'
 
// import { Redirect} from 'react-router-dom'
// import { Button, Form, InputGroup, FormControl, Col } from 'react-bootstrap'
import { Input, Segment, Form } from 'semantic-ui-react'
export default class CreatItem extends Component {


    state = {
        img_url: '',
        name: '',
        price: '',
        description: '',
        category: '',
        quantity: '',
        information: ''
    }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    goBack = (e) => {
        e.preventDefault()
        this.props.history.goBack()
    }

    onSubmit = (e) => {
        e.preventDefault()
        // let arrayItem = []
        // if(!arrayItem.includes(this.state)){
        //     arrayItem.push(this.state)
            this.props.addItem(this.state)
        // }
        this.props.history.push('/marketplace')
       
    }




    render() {
        return (
            <div className="add-item">
                <center>
                    <div style={{ minHeight: '100%' }} className="createform">
                        <Segment inverted style={{ backgroundColor: "#2F4F4F" }} >
                            <button
                                onClick={(e) => this.goBack(e)}

                                className="ui red inverted button"
                                style={{
                                    width: '29%', color: 'black',
                                    marginBottom: "2%"
                                }}
                            >
                                <span>Press here to go back</span>
                            </button>

                            <Form s onSubmit={this.onSubmit}  >
                                {/* <h2 style={{ color: "white", fontWeight: "bold" }}>Let's add an Item </h2> */}
                                <h2 style={{ marginLeft: "24%", backgroundColor: "#F5F5F5", width: '50%', fontWeight: "bold" }} className="ui block header">Let's add an Item. </h2>

                                <Form.Group widths='equal' style={{ display: "flex", flexDirection: "column" }}>
                                    <Input
                                        required
                                        placeholder="......https://images"
                                        value={this.state.img_url}
                                        onChange={this.onChange}
                                        name="img_url"
                                        action={{
                                            color: 'teal',
                                            labelPosition: 'left',
                                            icon: 'image',
                                            content: 'image',
                                        }}
                                        actionPosition='left'
                                        placeholder='...url'
                                    />
                                    <br />
                                    <Input
                                        required
                                        placeholder="..Enter name of the item"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        name="name"
                                        action={{
                                            color: 'teal',
                                            labelPosition: 'left',
                                            margin: "10px",
                                            icon: 'circle',
                                            content: 'name',
                                        }}
                                        actionPosition='left'
                                        placeholder='...Iphone 11, Honda Accord, etc.'
                                    />

                                    <br />
                                    <Input
                                        required
                                        placeholder="..Enter your contact information"
                                        value={this.state.information}
                                        onChange={this.onChange}
                                        name="information"
                                        action={{
                                            color: 'teal',
                                            labelPosition: 'left',
                                            margin: "10px",
                                            icon: 'address card outline',
                                            content: 'contact info',
                                        }}
                                        actionPosition='left'
                                        placeholder='phone number, email address'
                                    />

                                    <br />

                                    <Input
                                        required
                                        value={this.state.price}
                                        onChange={this.onChange}
                                        name="price"
                                        action={{
                                            color: 'teal',
                                            labelPosition: 'left',
                                            margin: "10px",
                                            icon: ' dollar',
                                            content: 'price',
                                        }}
                                        actionPosition='left'
                                        placeholder='...$$$'
                                    />

                                    <br />
                                    <Input
                                        required
                                        value={this.state.description}
                                        onChange={this.onChange}
                                        name="description"
                                        action={{
                                            color: 'teal',
                                            labelPosition: 'left',
                                            margin: "10px",
                                            icon: ' infor circle',
                                            content: 'details',
                                        }}
                                        actionPosition='left'
                                        placeholder='...more details about this item'
                                    />

                                    <br />
                                    <Input
                                        required
                                        value={this.state.category}
                                        onChange={this.onChange}
                                        name="category"
                                        action={{
                                            color: 'teal',
                                            labelPosition: 'left',
                                            margin: "10px",
                                            icon: ' tasks',
                                            content: 'category',
                                        }}
                                        actionPosition='left'
                                        placeholder='...electronics, car , clothes etc.'
                                    />

                                    <br />
                                    {/* <Input
                                        required
                                        value={this.state.quantity}
                                        onChange={this.onChange}
                                        name="quantity"
                                        action={{
                                            color: 'teal',
                                            labelPosition: 'left',
                                            margin: "10px",
                                            icon: 'braille',
                                            content: 'quantity',
                                        }}
                                        actionPosition='left'
                                        placeholder='...enter quantity'
                                    />

                                    <br /> */}
                                    {/* <Button
                                        style={{
                                            width: '20%', color: 'black',
                                            textAlign: 'center',
                                            marginLeft: "40%"
                                        }}

                                        value="Submit"
                                        type="submit">
                                        Submit
                                     </Button> */}
                                    <div className="ui buttons" style={{ width: "1%", marginLeft: "35%" }}>
                                        <button className="ui button"

                                            onClick={(e) => this.goBack(e)}
                                        >Cancel</button>
                                        <div className="or"></div>
                                        <button className="ui positive button"
                                            value="Submit"
                                            type="submit"
                                        >Submit</button> 
                                    </div>
                                </Form.Group>
                            </Form>
                        </Segment>
                    </div>
                </center>
            </div>
        )
    }
}
