import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
	productList = [];
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit() {
		this.getItems()
	}
	goHome(){
		this._router.navigate(['/'])
	}
	getItems(){
		this._httpService.getProducts().subscribe(data=>{
			this.productList = data['data'];
		})
	}
	deleteItem(id){
		this._httpService.deleteProduct(id).subscribe()
		this.getItems()
	}
	editItem(id){
		this._router.navigate(['/products/edit/'+id])
	}
}