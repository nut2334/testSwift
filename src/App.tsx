import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./menu";
import { Button, Space, Dropdown, Flex, Layout } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Testone from "./testone";
import { useAppSelector, useAppDispatch } from "./store/hook";
import { changeLang } from "./store/langReducer";
import { useTranslation } from "react-i18next";
import Testthree from "./testthree";
import "./main.scss";
import { setData } from "./store/formReducer";

function App() {
  const language = useAppSelector((state) => state.lang.lang);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const items: MenuProps["items"] = [
    {
      label: t("TH"),
      key: "1",
      onClick: () => {
        dispatch(changeLang("TH"));
      },
    },
    {
      label: t("EN"),
      key: "2",
      onClick: () => {
        dispatch(changeLang("EN"));
      },
    },
  ];

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    var data = window.localStorage.getItem("data");
    if (data) {
      dispatch(setData(JSON.parse(data)));
    }
  }, []);

  return (
    <>
      <Flex justify="flex-end" align="flex-start" className="lang-box">
        <Dropdown
          menu={{
            items,
          }}
        >
          <Button
            style={{
              width: "100px",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {t(language)}
            <DownOutlined
              style={{
                color: "gray",
              }}
            />
          </Button>
        </Dropdown>
      </Flex>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Menu />} />
          <Route path={`/Test1`} element={<Testone />} />
          <Route path={`/Test3`} element={<Testthree />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
