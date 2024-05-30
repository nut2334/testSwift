import React, { useEffect, useState } from "react";
import { Button, Table, Checkbox } from "antd";
import { useAppSelector, useAppDispatch } from "./store/hook";
import { DataState } from "./store/formReducer";
import type { GetProp, TableProps, PaginationProps } from "antd";
import { useTranslation } from "react-i18next";
import {
  deleteData,
  editData,
  selectAll,
  setSelect,
  deleteSelect,
} from "./store/formReducer";

type ColumnsType<T extends object> = GetProp<TableProps<T>, "columns">;
type TablePagination<T extends object> = NonNullable<
  Exclude<TableProps<T>["pagination"], boolean>
>;
type TablePaginationPosition = NonNullable<
  TablePagination<any>["position"]
>[number];

const Tabledata = () => {
  const data = useAppSelector((state) => state.data.data);
  const language = useAppSelector((state) => state.lang.lang);
  const all = useAppSelector((state) => state.data.selectAll);
  const { i18n, t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const handleDelete = (key: React.Key) => {
    dispatch(deleteData(key as string));
    alert(t("Delete Success"));
  };

  const handleEdit = (key: React.Key) => {
    dispatch(editData(key as string));
  };

  const columns: ColumnsType<DataState> = [
    {
      title: t("Name"),
      dataIndex: "Name",
      sorter: (a, b) =>
        (a.Firstname + " " + a.Lastname).localeCompare(
          b.Firstname + " " + b.Lastname
        ),
    },
    {
      title: t("Gender"),
      dataIndex: "Gender",
      sorter: (a, b) => t(a.Gender).localeCompare(t(b.Gender)),
    },
    {
      title: t("Mobile Phone"),
      dataIndex: "Mobile Phone",
      sorter: (a, b) =>
        (a.prefix + a["Mobile Phone"]).localeCompare(
          b.prefix + b["Mobile Phone"]
        ),
    },
    {
      title: t("Nationality"),
      dataIndex: "Nationality",
      sorter: (a, b) => t(a.Nationality).localeCompare(t(b.Nationality)),
    },
    {
      title: t("MANAGE"),
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              handleEdit(record.key);
            }}
          >
            {t("EDIT")}
          </Button>
          <Button
            type="link"
            onClick={() => {
              handleDelete(record.key);
            }}
          >
            {t("DELETE")}
          </Button>
        </>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataState[]) => {
      dispatch(setSelect(selectedRowKeys as string[]));
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    selectedRowKeys: all,
  };

  const onCheckAllChange = () => {
    dispatch(selectAll());
  };

  const handleDeleteSelect = () => {
    dispatch(deleteSelect());
    alert(t("Delete Success"));
  };

  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return <a>{t("PREV")}</a>;
    }
    if (type === "next") {
      return <a>{t("NEXT")}</a>;
    }
    return originalElement;
  };

  return (
    <div
      style={{
        padding: "0px 100px 0px 100px",
      }}
    >
      <Checkbox
        onChange={onCheckAllChange}
        checked={all.length === data.length && data.length !== 0}
      >
        {t("Select All")}
      </Checkbox>
      <Button
        onClick={() => {
          handleDeleteSelect();
        }}
      >
        {t("DELETE")}
      </Button>
      <Table
        columns={columns}
        dataSource={data.map((item) => {
          return {
            ...item,
            Name: item.Firstname + " " + item.Lastname,
            Gender: t(item.Gender) as string,
            Nationality: t(item.Nationality) as string,
            "Mobile Phone": item.prefix + item["Mobile Phone"],
          };
        })}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        pagination={{
          position: ["topRight" as TablePaginationPosition],
          itemRender,
        }}
      />
    </div>
  );
};

export default Tabledata;
