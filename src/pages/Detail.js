import React from 'react';
import '../styling/Detail.css'
import { Link } from 'react-router-dom'
class Detail extends React.Component {

    state = {
        redirect: false,
        singleItemDetail: [],
        value: 0
    }

    handleClick = () => {
        this.props.addToCart(this.props.item)
        this.setState({
            redirect: true
        })
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value })
    }

    componentDidMount() {
        let data = localStorage.getItem('data');
        fetch(`http://localhost:3001/items/${this.props.singleItem.id}`)
            .then(r => r.json())
            .then(fetchData => {
                if (fetchData.error === "Not Found") {
                    this.setState({
                        singleItemDetail: data
                    })
                } else {
                    this.setState({
                        singleItemDetail: fetchData
                    })
                }
            })
    }

    render() {
        let item
        if (JSON.stringify(this.state.singleItemDetail) !== "[]") {
            localStorage.setItem('data', JSON.stringify(this.state.singleItemDetail));
        }
        if (typeof this.state.singleItemDetail === "string") {
            item = JSON.parse(this.state.singleItemDetail)
        } else {
            item = this.state.singleItemDetail;
        }
        
        return (
            <div className="single_card">
                <React.Fragment>
                    <div className="left_div_container">
        <h2 style={{ paddingTop:"25px",marginLeft: "13%", backgroundColor: "#F5F5F5", width: '40%', fontWeight: "bold" }} className="ui block center header">{item.name}</h2>
                        <img className="image-card" alt="" width="400px" src={item.img_url} />
                    </div>
                    <div className="right_div_container" >
                        <table class="ui definition table">
                            <tbody class="">
                                <tr class="">
                                    <td class="two wide">Category</td>
                                    <td class="">{item.category}</td>
                                </tr>
                                <tr class="">
                                    <td class="">Contact Info</td>
                                    <td class="">{item.information}</td>
                                </tr>
                                <tr class="">
                                    <td class="">Description</td>
                                    <td class="">{item.description}</td>
                                </tr>
                                <tr class="">
                                    <td class="">Price</td>
                                    <td class="">${item.price}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="ui right labeled button" role="button" tabindex="0">
                            <button class="ui red button" onClick={() => this.props.addToCart(this.props.singleItem)} >
                                <i aria-hidden="true" class="heart icon"></i>
                                ADD to your cart
                        </button>

                            <button
                                onClick={this.props.goShopping}
                                class="ui green left pointing basic label">
                                <Link to='/marketplace'><div style={{ fontFamily: "Emilys Candy", color: "red" }}>Continue shopping</div>
                                </Link> 
                            </button>
                        </div>
                    </div>
                </React.Fragment>
            </div>
        )
    }
}

export default Detail;