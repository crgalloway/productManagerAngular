import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	product:any;
	error:any
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit() {
		this.product = {title: "", price: null, url: ""}
		this._route.params.subscribe((params: Params) => {
			this.getProduct(params['id'])
		})
		this.error={}
	}
	getProduct(id){
		this._httpService.getProduct(id).subscribe(data =>{
			this.product = data['data']
		})
	}
	onSubmit(){
		if(this.product.title.length<4){
			this.error['title']="Title must exceed 4 characters"
		}
		else{
			this.error['title'] = null
		}
		if(!this.product.price){
			this.error['price']="Invalid price"
		}
		else{
			this.error['price'] = null
		}
		if(!this.error['title'] && !this.error['price']){
			this._httpService.updateProduct(this.product).subscribe(data =>{
				if(data['error']){
					this.error = data['error']
				}
				this.product = {title: "", price: null, url: ""}
				this.goList()
			})
		}
		
	}
	goList(){
		this._router.navigate(['/products'])
	}
	deleteItem(id){
		this._httpService.deleteProduct(id).subscribe()
		this.goList()
	}
}
