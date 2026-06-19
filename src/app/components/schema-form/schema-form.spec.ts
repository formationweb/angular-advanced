import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaForm } from './schema-form';

describe('SchemaForm', () => {
  let component: SchemaForm;
  let fixture: ComponentFixture<SchemaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SchemaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
