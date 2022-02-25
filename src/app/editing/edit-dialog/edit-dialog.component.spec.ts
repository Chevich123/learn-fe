import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogComponent } from './edit-dialog.component';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('set username', () => {
    const username = 'John';
    component.name = username;
    expect(component.name).toEqual(username);
  })

  it('set email', () => {
    const email = 'test@mail.com';
    component.email = email;
    expect(component.email).toEqual(email);
  })

  it('set phone', () => {
    const phone = '375331111111';
    component.phone = phone;
    expect(component.phone).toEqual(phone);
  })

  it('set site', () => {
    const site = 'www.test.com';
    component.site = site;
    expect(component.site).toEqual(site);
  })
});
