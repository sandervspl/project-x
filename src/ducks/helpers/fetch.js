// eslint-disable-next-line import/prefer-default-export
export const handleFetchFail = (resultStatus, fetchFailAction, actionArray) => async (dispatch) => {
  const result = actionArray.find((action) => {
    if (Array.isArray(action.status)) {
      return action.status.find(status => status === resultStatus);
    }

    return action.status === resultStatus;
  });

  if (result) {
    dispatch(result.cb());
  } else {
    dispatch(fetchFailAction());
  }
};
