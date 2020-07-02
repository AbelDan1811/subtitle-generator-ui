import App from "../App";
import Paths from "./Paths";
import MainPageContainer from "../scenes/main-page/MainPageContainer";
import RecordListContainer from "../scenes/record-list/RecordListContainer";

const routes = [
    {
        component : App,
        routes : [
            {
                path : Paths.MainPage,
                exact : true,
                component : MainPageContainer
            },
            {
                path : Paths.RecordPage,
                exact : true,
                component : RecordListContainer
            }
        ]
    }
]

export default routes