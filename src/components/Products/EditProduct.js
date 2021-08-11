import React, { Component } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ProductService from './ProductService';
const productService = new ProductService();
class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:"",
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

   componentDidMount() {
     let urlId = this.props.match.params.id;
    let thisComponent = this;
    productService.getProductById(urlId)
      .then(function (response) {
        thisComponent.setState({
          id: response.data.id, 
          title: response.data.title, 
          tag: response.data.tag, 
          category: response.data.category, 
          descripition: response.data.descripition,
          price: response.data.price, 
          compare_price: response.data.compare_price, 
           });
      })
  }

  handleForm = e => {
    e.preventDefault();
    const data = new FormData()

    data.append('title', this.state.title)
    data.append('id', this.state.id)
    data.append('tag', this.state.tag)
    data.append('category', this.state.category)
    data.append('descripition', this.state.descripition)
    data.append('image', this.state.image)
    data.append('price', this.state.price)
    data.append('compare_price', this.state.compare_price)
    productService.updateProduct(data).then(response => {
      if(response.data)
      {
         this.setState({
            id: response.data.id, 
            title: response.data.title, 
            tag: response.data.tag, 
            category: response.data.category, 
            descripition: response.data.descripition,
            price: response.data.price, 
            compare_price: response.data.compare_price, 
             });
      }
       NotificationManager.success("Product Updated Sussceefully");

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
                    <div className="card">
                        <div className="card-header text-center">Product Id:{this.state.id}</div>
                        <div className="card-body">
                        <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-4">
                        <div className="form-group">
                                <label >Title</label>
                                <input type="text" required name="title" value={this.state.title} onChange={this.handleInput} className="form-control" placeholder="Enter Title" />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label >Tag</label>
                                <textarea value={this.state.tag}  name="tag" onChange={this.handleInput} className="form-control" placeholder="Enter Tag" ></textarea>
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >Category</label>
                                <input type="text" value={this.state.category}  name="category" onChange={this.handleInput} className="form-control" placeholder="Enter Category" />
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >Image</label>
                                <input type="file"  name="image" onChange={this.handleImage} className="form-control" placeholder="Enter Category" />
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >Price</label>
                                <input type="number" value={this.state.price}   name="price" onChange={this.handleInput} className="form-control" placeholder="Enter Price" />
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >Compare Price</label>
                                <input type="number" value={this.state.compare_price}  name="compare_price" onChange={this.handleInput} className="form-control" placeholder="Enter Compare Price" />
                            </div>
                            </div>
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label >Descripition</label>
                                <textarea value={this.state.descripition}  name="descripition" onChange={this.handleInput} className="form-control" placeholder="Enter descripition" ></textarea>
                            </div>
                            </div>
                        </div>
                        <div className="card-footer text-center"> <button type="submit" className="btn btn-primary text-center">Update Product</button></div>
                    </div>
                    </div>

                </form>
            </div>
    );
  }
}


export default EditProduct;

