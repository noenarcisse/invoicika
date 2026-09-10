import { render, screen } from '@testing-library/angular';
import { CustomerAddComponent } from './customer-add.component';

describe('CustomerAddComponent', () => {
  it('should create', async () => {
    // render(CustomerAddComponent)
    const { fixture } = await render(CustomerAddComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});