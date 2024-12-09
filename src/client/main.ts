import {assertIs} from '../common/check/is';
import {assertNotNull as notNull} from '../common/check/null';

const dateInput = assertIs(HTMLInputElement, document.querySelector('input#pickDate'));
dateInput.addEventListener('change', evt => {
  const date = notNull(dateInput.valueAsDate);
  window.location.replace(`/day/${date.getMonth() + 1}/${date.getDate()}`);
});
