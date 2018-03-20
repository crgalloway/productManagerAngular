import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

	constructor(
		private _http: HttpClient,
	) { }
	getProducts(){
		return this._http.get('/items');
	}
	createProduct(newProduct){
		return this._http.post('/items', newProduct)
	}
	deleteProduct(id){
		return this._http.delete('/items/'+id)
	}
	getProduct(id){
		return this._http.get('/items/'+id)
	}
	updateProduct(product){
		return this._http.put('/items/'+product._id, product)
	}
}	
