import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import requestAnimationFrame from "./tempPolyfills";

configure({ adapter: new Adapter(), disableLifecycleMethods: true });