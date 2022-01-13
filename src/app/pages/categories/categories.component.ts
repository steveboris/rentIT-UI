import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    this.categorieService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

}
