import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbnahmeComponent } from './abnahme.component';

describe('AbnahmeComponent', () => {
  let component: AbnahmeComponent;
  let fixture: ComponentFixture<AbnahmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbnahmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbnahmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
