import { render, screen } from "@testing-library/angular";
import { CustomerAddComponent } from "./customer-add.component";
import userEvent from "@testing-library/user-event";

import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideRouter } from "@angular/router";

describe("CustomerAddComponent", () => {
    it("email validation", async () => {
        const user = userEvent.setup();

        // doesnt work, missing ng zorro injection ...
        await render(CustomerAddComponent, {
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideRouter([]),
            ],
        });

        const emailInput = screen.getByPlaceholderText(/email/i);
        console.log(emailInput);
        expect(emailInput).toBeTruthy();

        await user.type(emailInput, "jacques-ouille.com");

        const err = screen.getByRole("alert", { name: /valid email/ });
        expect(err).toBeTruthy();
    });
});
