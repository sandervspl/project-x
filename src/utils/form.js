import { isEmpty } from 'validator';

export function getValueFromEvent(e, trimmed = false) {
  if (trimmed) {
    return e.target.value.trim();
  }

  return e.target.value;
}

export function getNameFromEvent(e) {
  return e.target.name;
}

export function validateInputMinChar(value, minCharacter) {
  return !isEmpty(value) && value.length >= minCharacter;
}
