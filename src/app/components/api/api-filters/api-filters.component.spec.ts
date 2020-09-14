import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiFiltersComponent } from './api-filters.component';

describe('ApiFiltersComponent', () => {
  let component: ApiFiltersComponent;
  let fixture: ComponentFixture<ApiFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
