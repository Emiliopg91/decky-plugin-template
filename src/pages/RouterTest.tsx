import { DialogButton, Navigation } from "decky-frontend-lib";
import { VFC } from "react";

export const RouterTest: VFC = () => {
    return (
      <div style={{ marginTop: "50px", color: "white" }}>
        Hello World!
        <DialogButton onClick={() => Navigation.NavigateToLibraryTab()}>
          Go to Library
        </DialogButton>
      </div>
    );
  };