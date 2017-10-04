// @flow
import { combineReducers } from "redux";

import RouterReducer from "beinformed/modules/Router/redux/RouterReducer";
import ApplicationReducer from "beinformed/modules/Application/redux/ApplicationReducer";
import CaseViewReducer from "beinformed/modules/CaseView/redux/CaseViewReducer";
import FormReducer from "beinformed/modules/Form/redux/FormReducer";
import I18nReducer from "beinformed/modules/I18n/redux/I18nReducer";
import MultiRowTaskReducer from "beinformed/modules/MultiRowTask/redux/MultiRowTaskReducer";
import LoginReducer from "beinformed/modules/Login/redux/LoginReducer";
import ModelCatalogReducer from "beinformed/modules/ModelCatalog/redux/ModelCatalogReducer";
import ConceptIndexReducer from "beinformed/modules/ConceptIndex/redux/ConceptIndexReducer";
import ConceptDetailReducer from "beinformed/modules/ConceptDetail/redux/ConceptDetailReducer";
import NotificationReducer from "beinformed/modules/Notification/redux/NotificationReducer";
import ProgressIndicatorReducer from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorReducer";
import ContentIndexReducer from "beinformed/modules/ContentIndex/redux/ContentIndexReducer";
import ContentDetailReducer from "beinformed/modules/ContentDetail/redux/ContentDetailReducer";
import TabReducer from "beinformed/modules/Tab/redux/TabReducer";
import TabComponentReducer from "beinformed/modules/TabComponent/redux/TabComponentReducer";
import UserProfileReducer from "beinformed/modules/UserProfile/redux/UserProfileReducer";

export const reducers = {
  router: RouterReducer,
  application: ApplicationReducer,
  caseview: CaseViewReducer,
  form: FormReducer,
  i18n: I18nReducer,
  multirowtask: MultiRowTaskReducer,
  login: LoginReducer,
  modelcatalog: ModelCatalogReducer,
  conceptindex: ConceptIndexReducer,
  conceptdetail: ConceptDetailReducer,
  notification: NotificationReducer,
  progressindicator: ProgressIndicatorReducer,
  contentindex: ContentIndexReducer,
  contentdetail: ContentDetailReducer,
  tab: TabReducer,
  tabcomponent: TabComponentReducer,
  userprofile: UserProfileReducer
};

/**
 * Create root reducer
 */
export const makeRootReducer = () => combineReducers(reducers);
