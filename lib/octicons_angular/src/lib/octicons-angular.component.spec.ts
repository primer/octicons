import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcticonsAngularComponent } from './octicons-angular.component';

describe('OcticonsAngularComponent', () => {
  let component: OcticonsAngularComponent;
  let fixture: ComponentFixture<OcticonsAngularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcticonsAngularComponent]
    });
    fixture = TestBed.createComponent(OcticonsAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
