import { html, customElement, LitElement, TemplateResult } from "lit-element";
import styles from "./rating-bar-css";
import { styleMap } from "lit-html/directives/style-map";
import { classMap } from "lit-html/directives/class-map";
import { TranslationClass, events } from "@orxe-culture/lit";

@customElement("orxe-rating-bar")
export default class OrxeRatingBar extends LitElement {
  /**
   * Implement `render` to define a template for button element.
   */

  @property({ type: Number, reflect: true })
  rating = 0;

  @property({ type: String, reflect: true })
  label = '';

  private actualRating = 0;
  static styles = styles;

  render() {
    this.actualRating = this.getRating();
    return html`
      ${this._renderRatingBar()}
    `;
  }
  private _renderRatingBar(): TemplateResult {

  return html`
        <svg
          data-testid="donut-rating-bar"
          aria-hidden="true"
          class="donut"
          width="40"
          height="40"
          viewBox="0 0 40 40"
        >
          <circle cx="20" cy="20" r="18" class="donut-track" />
          <circle
            data-testid="donut-track-indicator"
            cx="20"
            cy="20"
            r="18"
            style=${styleMap(this._showProgress())}
            class="donut-track__indicator ${this._getSvgClasses()}"
          />
        </svg>
        <div data-testid="donut-rating" class="donut-track__info">${this.actualRating}</div>
      `;
    }

  }
  private _showProgress(): Record<string, string> {
    const progress = {};
      if (this.rating > 100) {
        progress['stroke-dashoffset'] = 0;
      } else if (this.rating < 0) {
        progress['stroke-dashoffset'] = 113.04;
      } else {
        progress['stroke-dashoffset'] = 113.04 * (1 - this.rating / 100);
      }
      return progress;
    
  }

  getRating(): number {
    return !this.rating
      ? 0
      : this.rating > 100
        ? 10
        : this.rating < 0
          ? 0
          : Math.floor(this.rating) / 10;
  }

  private _addAriaLabel(): void {
    // TODO: the ariaLabel default value will be removed when i18n is available.
    let ariaLabel = `0 ${this.t('orxe-rating-bar.a11y_label')} 10`;
    if (this.rating && this.label) {
      ariaLabel = `${this.label} ${this.actualRating} ${this.t('orxe-rating-bar.a11y_label')} 10`;
    } else if (this.label) {
      ariaLabel = `${this.label} ${ariaLabel}`;
    } else if (this.rating) {
      ariaLabel = `${this.actualRating} ${this.t('orxe-rating-bar.a11y_label')} 10`;
    }
    this.setAttribute('aria-label', ariaLabel);
  }

  
}
