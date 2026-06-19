import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditSchema } from './user-edit-schema';

describe('UserEditSchema', () => {
  let component: UserEditSchema;
  let fixture: ComponentFixture<UserEditSchema>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditSchema],
    }).compileComponents();

    fixture = TestBed.createComponent(UserEditSchema);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
