import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/card.service';
import { Article } from 'src/app/models/Article';
import { Category } from 'src/app/models/Category';
import { ArticleService } from 'src/app/services/article.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  categories: Category[] = [];
  articles: Article[] = [];

  constructor(
    private categorieService: CategorieService,
    private articleService: ArticleService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.categorieService.getAll().subscribe(categories => {
      console.log(categories);
      this.categories = categories;
    });

    this.articleService.getAll().subscribe(articles => {
      console.log(articles);
      this.articles = articles;
    });
  }
  addToCard(article: any) {
    this.cardService.addItem(article);
  }

}
