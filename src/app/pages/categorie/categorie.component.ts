import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { Category } from 'src/app/models/Category';
import { ArticleService } from 'src/app/services/article.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  articles: Article[] = [];

  constructor(
    private categorieService: CategorieService,
    private articleService: ArticleService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe((param) => {
      console.log(param);
      this.categorieService.getOne(param.id).subscribe(categorie => {
        this.articles = [];
        categorie.articles.forEach(article => {
          this.articleService.getOne(article).subscribe(article_ => {
            this.articles.push(article_);
          });
        });
      });
    });
  }

}
