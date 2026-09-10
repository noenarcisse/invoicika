import { render, screen } from '@testing-library/angular';
import { CustomerAddComponent } from './customer-add.component';

describe('CustomerAddComponent', () => {
  it('should create', async () => {
    await render(CustomerAddComponent)
    // render(CustomerAddComponent)
    // const { fixture } = await render(CustomerAddComponent);
    // screen.findAllByRole()
    // expect(fixture.componentInstance).toBeTruthy();
  });
});