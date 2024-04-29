import { ButtonItem, Menu, MenuItem, Navigation, PanelSection, PanelSectionRow, ServerAPI, showContextMenu } from "decky-frontend-lib"
import { VFC } from "react"

import logo from "../../assets/logo.png"
import { Logger } from "../libraries/logger";
import { Translator } from "../libraries/translator";

export const MainMenu: VFC<{ serverAPI: ServerAPI }> = ({ serverAPI }) => {
  return (
    <PanelSection title={Translator.translate("panel.section")}>
      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={(e) =>
            showContextMenu(
              <Menu label="Menu" cancelText={Translator.translate("cancel")} onCancel={() => { }}>
                <MenuItem onSelected={() => { }}>{Translator.translate("item.#", { id: 1 })}</MenuItem>
                <MenuItem onSelected={() => { }}>{Translator.translate("item.#", { id: 2 })}</MenuItem>
                <MenuItem onSelected={() => { }}>{Translator.translate("item.#", { id: 3 })}</MenuItem>
                <MenuItem onSelected={() => { }}>{Translator.translate("item.#", { id: 4 })}</MenuItem>
              </Menu>,
              e.currentTarget ?? window
            )
          }
        >
          {Translator.translate("server.says.yolo")}
        </ButtonItem>
      </PanelSectionRow>

      <PanelSectionRow>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} />
        </div>
      </PanelSectionRow>

      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => {
            Navigation.CloseSideMenus();
            Navigation.Navigate("/decky-plugin-test");
            serverAPI.callPluginMethod("add", { left: 1, right: 2 }).then((e) => {
              Logger.info("1+2=" + e.result);
            })
          }}
        >
          {Translator.translate("router")}
        </ButtonItem>
      </PanelSectionRow>
    </PanelSection>
  );
};