import { flag } from "flags/next";

export const myFlag = flag({
  key: "myFlag",
  decide() {
    return true;
  },
});
