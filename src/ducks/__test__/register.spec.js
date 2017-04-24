/* eslint-disable */
import registerReducer from '../modules/register';
import * as register from '../modules/register';

describe('Register reducer', () => {
  it('Should have a default state', () => {
    expect(registerReducer(undefined, { type: 'unexpected' })).toEqual(register.initialState);
  });

  it('Should receive a message on creation failure', () => {
    expect(registerReducer(undefined, { type: register.CREATE_FAIL })).not.toEqual('');
  });

  it('Should correctly validate login form', () => {
    expect(register.setLoginFormValidation(true)).toEqual({
      type: register.LOGIN_FORM_VALID,
    });
  });

  it('Should correctly invalidate login form', () => {
    expect(register.setLoginFormValidation(false)).toEqual({
      type: register.LOGIN_FORM_INVALID,
    });
  });

  it('Should correctly validate personal form', () => {
    expect(register.setPersonalFormValidation(true)).toEqual({
      type: register.PERSONAL_FORM_VALID,
    });
  });

  it('Should correctly invalidate personal form', () => {
    expect(register.setPersonalFormValidation(false)).toEqual({
      type: register.PERSONAL_FORM_INVALID,
    });
  });

  it('Should go to page 1', () => {
    expect(register.toRegisterPage(1)).toEqual({
      type: register.TO_REGISTER_PAGE,
      page: 1,
    });
  });

  it('Should go to page 2', () => {
    expect(register.toRegisterPage(2)).toEqual({
      type: register.TO_REGISTER_PAGE,
      page: 2,
    });
  });

  it('Should return a new user object on create');
});
