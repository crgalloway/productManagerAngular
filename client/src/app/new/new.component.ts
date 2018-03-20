import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-new',
	templateUrl: './new.component.html',
	styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	newProduct: any
	error:any
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit() {
		this.newProduct = {title: "", price: null, url: ""}
		this.error = {}
	}
	goList(){
		this._router.navigate(['/products'])
	}
	onSubmit(){
		this._httpService.createProduct(this.newProduct).subscribe(data =>{
			if(data['error']){
				for(var x in data['error']['errors']){
					this.error[x]=data['error']['errors'][x]['message']
				}
			}
			else{
				this.newProduct = {title: "", price: null, url: ""}
				this.goList()
			}
		})
	}
}