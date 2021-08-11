import React, { Component } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ProductService from './ProductService';
import {Link} from 'react-router-dom';
const productService = new ProductService();
class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductList: [],
      errors: {}
    };
  }
  handleForm = e => {
    e.preventDefault();
  };
  handleInput = e => {
    e.preventDefault();
  };
  componentDidMount() {
    let thisComponent = this;
    productService.getProducts()
      .then(function (response) {
        thisComponent.setState({ ProductList: response.data });
      })
  }
  handleDelete(id)
  {
    let selfComponent = this;
      productService.deleteProduct(id).then(function (response) {
        NotificationManager.warning("Product Deteted Successfully");
        selfComponent.setState({ ProductList: response.data });
      })
    
  }


  render() {
    return (
      <div className="content">
        <NotificationContainer />
        <form onSubmit={this.handleForm}>
          <div className="card">
            <div className="card-header text-center">Product List</div>
            <div className="card-body table-responsive">
              <div className="row" style={{ marginTop: 20 }}>
                <div className="col-sm-12">
                  <table className="table" >
                    <thead>
                      <tr>
                        <th>Product Id</th>
                        <th >Product Image</th>
                        <th>Product Name</th>
                        <th>Product Desription</th>
                        <th>Price</th>
                        <th>Created Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.ProductList.map(data =>
                        <tr key={data.id}>
                          <td>{data.id}</td>
                          <td >
                            <img src={"http://localhost:8000"+data.image} alt={data.title} className="img-thumbnail" ></img>
                          </td>
                          <td>{data.title}</td>
                      <td> { ((data.descripition).length > 100) ? 
    (((data.descripition).substring(0,100-3)) + '  ....') : 
    data.descripition } 
   </td>
                      <td>{data.price}</td>
                      <td>{data.created_at}</td>
                      <td><Link  className="btn btn-primary"  to={"/product-edit/"+data.id}>Edit</Link>  <button className="btn btn-danger"  onClick={(e)=> this.handleDelete(data.id) }> Delete</button></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>


        </form>
      </div>
    );
  }
}


export default ListProduct;

