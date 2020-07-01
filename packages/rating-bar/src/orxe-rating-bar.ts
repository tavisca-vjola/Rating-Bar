import { html, customElement, LitElement } from 'lit-element';
import styles from './rating-bar-css';

@customElement('orxe-rating-bar')
export default class OrxeRatingBar extends LitElement {
  /**
   * Implement `render` to define a template for button element.
   */
  render() {
    return html`
      <p>Hello, Welcome to lit Elements</p>
    `;
  }

  /**
   *  Getting styles from components custom scss file
   */
  static styles = styles;
}
