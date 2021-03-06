import React from "react";
import { ComboBox, IComboBox } from "office-ui-fabric-react/lib/index";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import {
  T,
  changeLanguage,
  getLanguage,
  LanguageType,
} from "@services/translation";
import Config from "@config";
import "./index.css";
initializeIcons(/* optional base url */);
import Logo from "../../assets/img/sr-logo.png";
import defaultPerson from "../../assets/img/sr-personal-photo.png";
export interface IUserInfo {
  name: string;
  photo: string;
  id: string;
  department?: string;
}
interface IHeaderProps {
  info?: any;
}

export class Header extends React.Component<
  IHeaderProps,
  {
    search: string;
    languageItem: IDropdownOption;
  }
> {
  private languageOptions: IDropdownOption[] = [
    { key: LanguageType.zh, text: T("简体中文") },
    { key: LanguageType.en, text: T("English") },
  ];
  constructor(props) {
    super(props);
    let languageItem: IDropdownOption = this.languageOptions[0];
    let currentLanguage: string = getLanguage();
    this.languageOptions.forEach((option) => {
      if (option.key === currentLanguage) {
        languageItem = option;
      }
    });
    this.state = {
      search: "",
      languageItem,
    };
  }

  private _basicComboBox = React.createRef<IComboBox>();

  render() {
    let userInfo: IUserInfo = {
      name: this.props.info ? this.props.info.userInfo.Title : "",
      photo: this.props.info
        ? this.props.info.userInfo.PicUrl
        : Config.File.Img.Path + "/sr-personal-photo.png",
      // photo: Config.File.Img.Path + "/sr-personal-photo.png",
      id: this.props.info ? this.props.info.userInfo.ID : "",
      department: this.props.info ? this.props.info.userInfo.Department : "",
    };
    return (
      <div className="sr-header">
        <div className="sr-header-layout clearfix">
          <div className="sr-header-left">
            <div className="sr-header-logo">
              <h1>
                <a href="/html/App.html">
                  <img src={Logo} alt="" />
                </a>
              </h1>
            </div>
            <div className="sr-system-name">
              <span className="sr-name-car">{T("微钉科技")} </span>
              <span className="sr-name-document">{T("前端代码")}</span>
            </div>
          </div>
          <div className="sr-header-right">
            <div className="sr-search-box"></div>
            <div className="sr-user">
              <div
                className="sr-user-name"
                onClick={() => {
                  if (this._basicComboBox.current) {
                    this._basicComboBox.current.focus(true);
                  }
                }}
                title={userInfo.name}
              >
                {userInfo.name}
              </div>
              <div
                className="sr-user-picture"
                onClick={() => {
                  if (this._basicComboBox.current) {
                    this._basicComboBox.current.focus(true);
                  }
                }}
              >
                <img
                  src={userInfo.photo}
                  alt=""
                  onError={(e) => {
                    (e.target as any).onerror = null;
                    (e.target as any).src = defaultPerson;
                  }}
                />
              </div>
              <div className="sr-exit-current-user">
                <ComboBox
                  allowFreeform
                  autoComplete="on"
                  options={[{ key: "changUser", text: T("切换用户") }]}
                  componentRef={this._basicComboBox}
                  onItemClick={() =>
                    (window.location.href =
                      "/_layouts/15/closeConnection.aspx?loginasanotheruser=true&Source=" +
                      window.location.href)
                  }
                />
              </div>
            </div>
            <div className="sr-language">
              <Dropdown
                defaultSelectedKey={
                  this.state.languageItem
                    ? this.state.languageItem.key
                    : undefined
                }
                options={this.languageOptions}
                onChanged={this.onChangeLanguage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * 更换语言系统
   * @param option
   */
  private onChangeLanguage = (option: IDropdownOption) => {
    this.setState({
      languageItem: option,
    });
    changeLanguage(option.key as string);
  };
}

export default Header;
