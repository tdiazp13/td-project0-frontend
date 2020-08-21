import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CLoaderComponent } from './c-loader.component';

describe('CLoaderComponent', () => {
  let component: CLoaderComponent;
  let fixture: ComponentFixture<CLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
