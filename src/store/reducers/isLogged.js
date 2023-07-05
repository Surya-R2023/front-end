const defaultState = {
  menuList: [],
  customerStatus: {},
  alertsList: [],
  fireAlertsList: [],
  pumpAlertsList: [],
  fireAlerts: [],
  fireAlertsAlarm: [],
};

const loggedReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "MENU_LIST_":
      return { ...state, menuList: action.data };
    case "CUSTOMER_STATUS_":
      return { ...state, customerStatus: action.data };
    case "ALERTS_LIST_":
      return { ...state, alertsList: action.data };
    case "FIRE_ALERTS_LIST_":
      return { ...state, fireAlertsList: action.data };
    case "PUMP_ALERTS_LIST_":
      return { ...state, pumpAlertsList: action.data };
    case "FIRE_ALERTS_":
      return { ...state, fireAlerts: action.data };
    case "FIRE_ALERTS_ALARM_":
      return { ...state, fireAlertsAlarm: action.data };
    case "ACKNOWLEDGEMENT_LIST_":
      return { ...state, acknowledgementList: action.data };
    default:
      return state;
  }
};
export default loggedReducer;
