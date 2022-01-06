import { TestBed } from '@angular/core/testing';

import { ArticleQuantityService } from './article-quantity.service';

describe('ArticleQuantityService', () => {
  let service: ArticleQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
