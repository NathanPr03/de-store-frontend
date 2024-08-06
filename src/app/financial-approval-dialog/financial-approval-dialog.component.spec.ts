import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialApprovalDialogComponent } from './financial-approval-dialog.component';

describe('FinancialApprovalDialogComponent', () => {
  let component: FinancialApprovalDialogComponent;
  let fixture: ComponentFixture<FinancialApprovalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialApprovalDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialApprovalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
