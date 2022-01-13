import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/card.service';
import { ArticleQuantityService } from 'src/app/services/article-quantity.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  totalProduct: number = 0;
  totalPrice_: number = 0;
  cardProdukts: any[];
  form: FormGroup;
  noProducts: boolean = false;

  emptyArticle = {
    quantity: [""],
    returnDate: [""]
  };

  constructor(
    private fb: FormBuilder,
    private articleQuantityService: ArticleQuantityService,
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService,
    private cardService: CardService
  ) { }

  ngOnInit(): void {

    this.cardProdukts = JSON.parse(localStorage.getItem('cart'));
    console.log(this.cardProdukts);

    if(this.cardProdukts && this.cardProdukts.length > 0) {
      this.totalProduct = this.cardProdukts.length;
      this.form = this.fb.group({
        propArray: this.fb.array([...this.createItems(this.totalProduct)]),
      });
  
      let vals = {
        propArray:this.cardProdukts
      }
  
      this.form.patchValue(vals);
    } else {
      this.noProducts = true;
    }

  }

  computTotalPrice(event: any, article: any) {
    let sum : any = 0;
    this.cardProdukts.forEach(produkt => {
      if(produkt.articleId === article.articleId) {
        sum += (produkt.price * event.target.value);
        produkt.quantity = +event.target.value; 
        console.log(sum)
        produkt.totalPrice = sum;
        
        this.getTotalPrice();
      }
    });
  }

  getTotalPrice(): number {
    let sum : any = 0;
    this.cardProdukts.forEach(produkt => {
      console.log(produkt?.totalPrice ? produkt?.totalPrice : 0);

      sum += produkt?.totalPrice ? produkt?.totalPrice : 0 ;
      this.totalPrice_ = sum;
    });
    return sum;
  }

  onChangeEvent(event: any, article: any, i: number) {
    this.computTotalPrice(event, article);
  }

  rentArticles() {
    let articles : any[] = this.form.value.propArray;
    let rental: any[] = [];
    articles.forEach(article => {
      rental.push(
        {
          article: {
            articleId: article.articleId
          },
          quantity: article.quantity,
          returnDate: article.returnDate,
          rentalDate: new Date()
        }
      )
    });

    console.log(rental);

    if(this.authService.isLoggedIn){
      this.articleQuantityService.addOne(rental).subscribe(response => {
        console.log(response);
        let userId = localStorage.getItem("id");
        this.toaster.success("Successfully rented!", "Success");
        this.cardService.setData([]);
        this.router.navigate(["/dashboard", userId]);
      });
    } else {
      this.toaster.error("You are not signed in!", "Error");
      this.router.navigate(['signin'])
    }
  }

  private createItem(): FormGroup {
    return this.fb.group({
      articleId: 0,
      quantity: '',
      returnDate: '',
    });
  }

  private createItems(count: number): FormGroup[] {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(this.createItem());
    }
    return arr;
  }

  removeCardProduct(id: number) {
    this.cardService.removeData(id);
    this.ngOnInit();
  }
}
