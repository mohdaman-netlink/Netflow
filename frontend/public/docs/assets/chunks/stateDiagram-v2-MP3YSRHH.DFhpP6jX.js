import { s as styles_default, b as stateRenderer_v3_unified_default, a as stateDiagram_default, S as StateDB } from "./chunk-IMKFNOWR.DpT5errn.js";
import { _ as __name } from "../app.DDZvPLdk.js";
import "./chunk-XXDRQBXY.DU7-dbcS.js";
import "./chunk-POPQ4Y6H.CtzJ3XYi.js";
import "./chunk-F27PBJKO.BBRLBtat.js";
import "./framework.CXM-6NNN.js";
import "./theme.C1GAXwfE.js";
var diagram = {
  parser: stateDiagram_default,
  get db() {
    return new StateDB(2);
  },
  renderer: stateRenderer_v3_unified_default,
  styles: styles_default,
  init: /* @__PURE__ */ __name((cnf) => {
    if (!cnf.state) {
      cnf.state = {};
    }
    cnf.state.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
  }, "init")
};
export {
  diagram
};
