import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ProductService{
	
	// constructor(){}

	getProducts() {
		const url = `${API_URL}/ecom/products/`;
		return axios.get(url).then(response => response.data);
	}

	// getProductsByURLLink(link){
	// 	const url = `${API_URL}${link}`;
	// 	return axios.get(url).then(response => response.data);
	// }

	getProductById(id) {
		const url = `${API_URL}/ecom/products/?id=${id}`;
		return axios.get(url).then(response => response.data);
	}

	deleteProduct(id){
		const url = `${API_URL}/ecom/products/?id=${id}`;
		return axios.delete(url).then(response => response.data);
	}

	createProduct(product){
		const url = `${API_URL}/ecom/products/`;
		return axios.post(url,product);
	}

	updateProduct(product){
		const url = `${API_URL}/ecom/products/`;
		return axios.put(url,product).then(response => response.data);
	}
}