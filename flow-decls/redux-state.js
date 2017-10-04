import { ApplicationState } from "beinformed/modules/Application/redux/ApplicationReducer";
import { CaseViewState } from "beinformed/modules/CaseView/redux/CaseViewReducer";
import { ConceptDetailState } from "beinformed/modules/ConceptDetail/redux/ConceptDetailReducer";
import { ConceptIndexState } from "beinformed/modules/ConceptIndex/redux/ConceptIndexReducer";
import { ContentDetailState } from "beinformed/modules/ContentDetail/redux/ContentDetailReducer";
import { ContentIndexState } from "beinformed/modules/ContentIndex/redux/ContentIndexReducer";
import { FormState } from "beinformed/modules/Form/redux/FormReducer";
import { I18nState } from "beinformed/modules/I18n/redux/I18nReducer";
import { LoginState } from "beinformed/modules/Login/redux/LoginReducer";
import { ModelCatalogState } from "beinformed/modules/ModelCatalog/redux/ModelCatalogReducer";
import { MultiRowTaskState } from "beinformed/modules/MultiRowTask/redux/MultiRowTaskReducer";
import { NotificationState } from "beinformed/modules/Notification/redux/NotificationReducer";
import { ProgressIndicatorState } from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorReducer";
import { RouterState } from "beinformed/modules/Router/redux/RouterReducer";
import { TabState } from "beinformed/modules/Tab/redux/TabReducer";
import { TabComponentState } from "beinformed/modules/TabComponent/redux/TabComponentReducer";
import { UserProfileState } from "beinformed/modules/UserProfile/redux/UserProfileReducer";

declare type State =
  | ApplicationState
  | CaseViewState
  | ConceptDetailState
  | ConceptIndexState
  | ContentDetailState
  | ContentIndexState
  | FormState
  | I18nState
  | LoginState
  | ModelCatalogState
  | MultiRowTaskState
  | NotificationState
  | ProgressIndicatorState
  | RouterState
  | TabState
  | TabComponentState
  | UserProfileState;
