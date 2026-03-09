import { Tabs } from "antd";
import Movies from "../Admin/Movies";
import Artists from "../Admin/Artists";
import Users from "../Admin/Users";
import { useSelector } from "react-redux";
import Item from "antd/es/list/Item";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Admin() {
  const [activeTab, setActiveTab] = useState("1");
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {});
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-semibold text-gray-700">Admin Panel</h1>
          <p className="text-sm text-gray-500">
            Manage movies, artists, and users from a single place.
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Logged in as <span className="font-semibold">{user?.name}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <Tabs
          className="border-b border-gray-200 px-4 pt-4"
          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key);
            navigate(`/admin?tab=${key}`);
          }}
        >
          <Item tab="Movies" key="1">
            <div className="p-4">
              <Movies />
            </div>
          </Item>
          <Item tab="Artists" key="2">
            <div className="p-4">
              <Artists />
            </div>
          </Item>
          <Item tab="Users" key="3">
            <div className="p-4">
              <Users />
            </div>
          </Item>
        </Tabs>
      </div>
    </div>
  );
}

export default Admin;
