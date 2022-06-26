import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ManageProductsComponent implements OnInit {

  searchForm!: FormGroup;
  addProductForm!: FormGroup;
  retData: any;
  addButtonClickedFlag: boolean = false;

  constructor(private formBuilder: FormBuilder, private _http: HttpClient,
    private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.searchForm = this.formBuilder.group({
      category: [''],
    });
    this.addProductForm = this.formBuilder.group({
      name: [''],
      price: [''],
      desc: [''],
      category: [''],
      image: [''],
      stock: [''],
    });
  }

  async getProducts(){
    if(this.searchForm.value.category != null && this.searchForm.value.category.length > 0){
      console.log("getting products by category")
      this.getAllProductsByCategory();
    }else{
      console.log("getting all products")
      this.getAllProducts();
    }
  }

  async getAllProducts(){
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      this._http.get<any>('http://localhost:8081/products', {headers}).subscribe(data => {
        this.retData = data;
  })
}

  async getAllProductsByCategory(){
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      this._http.get<any>('http://localhost:8081/products/category?category='.concat(this.searchForm.value.category), {headers}).subscribe(data => {
        this.retData = data;
    })
  }

  async addProduct(){
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    this._http.post<any>('http://localhost:8081/add/product',
      {
        name: this.addProductForm.value.name,
        price: this.addProductForm.value.price,
        description: this.addProductForm.value.desc,
        category: this.addProductForm.value.category,
        imageURL: this.addProductForm.value.image,
        stock: this.addProductForm.value.stock
      }, {headers}).subscribe(data => {
        // this.retData = data;
        console.log(data)
        if(data !== undefined) {
          this.getAllProducts();
          this.addButtonClickedFlag = false;
        }
        // this.loginForm.reset();
        // if("ADMIN" === this.retData){
        //   this.router.navigate(['/admin']);
        // } else {
        //   this.router.navigate(['/home']);
        // }
    })
  }

  addButtonClicked(){
    this.addButtonClickedFlag = !this.addButtonClickedFlag;
  }

  cancelButtonClicked(){
    this.addButtonClickedFlag = !this.addButtonClickedFlag;
  }

}
