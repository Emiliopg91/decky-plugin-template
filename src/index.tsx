import {
  definePlugin,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";
import { FaShip } from "react-icons/fa";
import { MainMenu } from "./pages/MainMenu"
import { RouterTest } from "./pages/RouterTest"
import { Constants } from "./utils/constants";

import spanish from "../assets/languages/es.json";
import english from "../assets/languages/en.json";
import { Configuration, Framework, Logger, Language } from "decky-plugin-framework";


export default definePlugin((serverApi: ServerAPI) => {
  (async () => {
    await Framework.initialize(serverApi, Constants.PLUGIN_NAME, Constants.PLUGIN_VERSION, Language.english, { [Language.english]: english, [Language.spanish]: spanish })
    Configuration.subscribe((e) => {
      Logger.info("Updated configuration: " + JSON.stringify(e))
    });
    Configuration.setEntry<Config>("time", new Date().toLocaleString(), true)
    Logger.info(Configuration.getEntry<Config>("time"));
  })()

  serverApi.routerHook.addRoute(Constants.ROUTE_DECKY_PLUGIN_TEST, RouterTest, {
    exact: true,
  });

  return {
    title: <div className={staticClasses.Title}>{Constants.PLUGIN_NAME}</div>,
    content: <MainMenu />,
    icon: <FaShip />,
    onDismount() {
      serverApi.routerHook.removeRoute(Constants.ROUTE_DECKY_PLUGIN_TEST);
    },
  };
});
