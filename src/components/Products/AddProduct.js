import React, { Component } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ProductService from './ProductService';
const productService = new ProductService();
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : "",
      tag : "",
      category : "",
      descripition : "",
      image : "",
      price : "",
      compare_price : "",
      errors: {}
    };
  }
  handleForm = e => {
    e.preventDefault();
    const data = new FormData()

    data.append('title', this.state.title)
    data.append('tag', this.state.tag)
    data.append('category', this.state.category)
    data.append('descripition', this.state.descripition)
    data.append('image', this.state.image)
    data.append('price', this.state.price)
    data.append('compare_price', this.state.compare_price)
    
    // axios
    productService.createProduct(data).then(result => {
      console.log(result);
      NotificationManager.success("Product Added Sussceefully");
    })
    .catch(err => {
      if (err.response && err.response.status === 400)
        NotificationManager.error(err.response.data.msg);
      else
        NotificationManager.error("Something Went Wrong");
      this.setState({ errors: err.response })
    });
};
  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  handleImage=e=>{
    e.preventDefault();
    this.setState({ image: e.target.files[0] });
  };
  render() {
    return (
      <div className="content">
        <NotificationContainer />
                <form onSubmit={this.handleForm}>
                    {/* <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-8"> */}
                    <div className="card">
                        <div className="card-header text-center">Add Product</div>
                        <div className="card-body">
                        <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-4">
                        <div className="form-group">
                                <label >Title</label>
                                <input type="text" required name="title" onChange={this.handleInput} className="form-control" placeholder="Enter Title" />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label >Tag</label>
                                <textarea  name="tag" onChange={this.handleInput} className="form-control" placeholder="Enter Tag" ></textarea>
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >Category</label>
                                <input type="text"  name="category" onChange={this.handleInput} className="form-control" placeholder="Enter Category" />
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >Image</label>
                                <input type="file" required name="image" onChange={this.handleImage} className="form-control" placeholder="Enter Category" />
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >Price</label>
                                <input type="number"  name="price" onChange={this.handleInput} className="form-control" placeholder="Enter Price" />
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >Compare Price</label>
                                <input type="number"  name="compare_price" onChange={this.handleInput} className="form-control" placeholder="Enter Compare Price" />
                            </div>
                            </div>
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label >Descripition</label>
                                <textarea   name="descripition" onChange={this.handleInput} className="form-control" placeholder="Enter descripition" ></textarea>
                            </div>
                            </div>
                        </div>
                        <div className="card-footer text-center"> <button type="submit" className="btn btn-primary text-center">Add Product</button></div>
                    </div>
                    </div>
                        {/* </div>
                        <div className="col-sm-2"></div>
                    </div> */}

                </form>
            </div>
    );
  }
}


export default AddProduct;

