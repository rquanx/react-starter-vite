import Mock from "mockjs";
import { getSearchParams } from "@services/common";
import Config from "@src/config";
import file from "./file";
const apiList = [...file];

const SWITCH = "mock";
const searchArg = getSearchParams();

if (searchArg[SWITCH] || Config.Features.Mock) {
  console.log("%c mock open",'color:blue;');
  apiList.forEach(({ path, type, template }) => {
    Mock.mock(path, type, template);
  });
}
