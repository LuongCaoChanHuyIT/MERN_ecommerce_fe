import { Menu } from "antd";
import React, { useState } from "react";
import { getLevelKeys } from "../../utils";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const items = [
  {
    key: "1",
    icon: <MailOutlined />,
    label: "Navigation One",
    children: [
      {
        key: "11",
        label: "Option 1",
      },
      {
        key: "12",
        label: "Option 2",
      },
      {
        key: "13",
        label: "Option 3",
      },
      {
        key: "14",
        label: "Option 4",
      },
    ],
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: "Navigation Two",
    children: [
      {
        key: "21",
        label: "Option 1",
      },
      {
        key: "22",
        label: "Option 2",
      },
      {
        key: "23",
        label: "Submenu",
        children: [
          {
            key: "231",
            label: "Option 1",
          },
          {
            key: "232",
            label: "Option 2",
          },
          {
            key: "233",
            label: "Option 3",
          },
        ],
      },
      {
        key: "24",
        label: "Submenu 2",
        children: [
          {
            key: "241",
            label: "Option 1",
          },
          {
            key: "242",
            label: "Option 2",
          },
          {
            key: "243",
            label: "Option 3",
          },
        ],
      },
    ],
  },
  {
    key: "3",
    icon: <SettingOutlined />,
    label: "Navigation Three",
    children: [
      {
        key: "31",
        label: "Option 1",
      },
      {
        key: "32",
        label: "Option 2",
      },
      {
        key: "33",
        label: "Option 3",
      },
      {
        key: "34",
        label: "Option 4",
      },
    ],
  },
];

const AdminPage = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const levelKeys = getLevelKeys(items);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    console.log(currentOpenKey);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["231"]}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
      }}
      items={items}
    />
  );
};

export default AdminPage;
