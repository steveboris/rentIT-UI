import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/card.service';
import { Article } from 'src/app/models/Article';
import { ArticleQuantityService } from 'src/app/services/article-quantity.service';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  form: FormGroup;
  actualArticle: Article;
  startDate = new Date();
  rentForm: boolean = false;
  validateForm: boolean = false;

  constructor(
    private activeRoure: ActivatedRoute,
    private articleService: ArticleService,
    private fb: FormBuilder,
    private articleQuantityService: ArticleQuantityService,
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService,
    private cardService: CardService
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      quantity: ["", [Validators.required]],
      returnDate: ["", [Validators.required]]
    });

    this.activeRoure.params.subscribe(params => {
      console.log(params);
      this.articleService.getOne(params.id).subscribe(article => {
        console.log(article);
        this.actualArticle = article;
      });
    });
  }

  rentArticle(actualArticleId : number) {
    this.rentForm = true;
  }

  openForm() {
    this.rentForm = true;
  }

  addToCard(article: any) {
    this.cardService.addItem(article);
  }

  clickButton(actualArticleId : number) {
    if(this.form.valid) {
      let rental = [
        {
          article: {
            articleId: actualArticleId
          },
          quantity: this.form.get("quantity").value,
          returnDate: this.form.get("returnDate").value,
          rentalDate: new Date()
        }
      ]

      if(this.authService.isLoggedIn){
        this.articleQuantityService.addOne(rental).subscribe(response => {
          console.log(response);
          let userId = localStorage.getItem("id");
          this.toaster.success("Successfully rented!", "Success");
          this.router.navigate(["/dashboard", userId]);
        });
      } else {
        this.toaster.error("You are not signed in!", "Error");
        this.router.navigate(['signin'])
      }
    }
  }

}
