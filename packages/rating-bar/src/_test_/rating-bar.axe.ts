import { OrxeRatingBar } from "../";

import { axe, toHaveNoViolations } from "@orxe-devkit/axe";
expect.extend(toHaveNoViolations);

describe("orxe-rating-bar-axe", () => {
  it("", () => {
    expect(true).toBeTruthy();
  });

  let RatingBar;

  beforeEach(async () => {
    OrxeRatingBar;
    document.body.appendChild(document.createElement("RatingBar"));
  });

  afterEach(() => {
    RatingBar.remove();
  });

  it("should support all WCAG Accessibility Rules. when default toolbar is rendered", async () => {
    const result = await axe(RatingBar);
    expect(result).toHaveNoViolations();
  });
});
