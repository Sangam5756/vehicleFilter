"use client";
import React, { useState, useEffect } from "react";
import { Table, Tooltip, Select, Input, Button, Dropdown, Menu } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { InfoCircleOutlined, DownOutlined } from "@ant-design/icons";

import Shimmer from "./components/Loading/Shimmer";
import type { RootState } from "./store";
import { setData, setLoading } from "./store/vehicleSlice";
import { useDispatch, useSelector } from "react-redux";
import type { Vehicle } from "./constants/TypesVehicle";



const VehicleTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: RootState) => state.vehicle);


  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<String>("All");
  const [selectedSpecificCategory, setSelectedSpecificCategory] =useState<string>("");

  const [specificCategory, setSpecificCategory] = useState<string[]>([]);

  const [sorter, setSorter] = useState<{
    field: string;
    order: "ascend" | "descend" | null;
  } | null>(null);

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("All");
    setSelectedSpecificCategory("");
    setSpecificCategory([]);
    setSorter(null); 
  };


  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));

      try {
        const response = await fetch(
          "https://mocki.io/v1/9be54cb5-c3bc-4713-a483-007275eec105"
        );

        const vehicleData = await response.json();
        dispatch(setData(vehicleData));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      const uniqueOptions = Array.from(
        new Set(
          data.map((vehicle: Vehicle) => {
            switch (category) {
              case "Name":
                return vehicle.Name;
              case "Model":
                return vehicle.Model;
              case "Type":
                return vehicle.Type;
              case "Manufacturer":
                return vehicle.Manufacturer;
              default:
                return "";
            }
          })
        )
      );
      setSpecificCategory(uniqueOptions);
    }
  }, [category, data]);

  
  const filteredData = data.filter((vehicle: Vehicle) => {
    const searchValue = searchTerm?.toLowerCase();
    const matchesCategory = selectedSpecificCategory
      ? vehicle[category]?.toLowerCase() ===
        selectedSpecificCategory?.toLowerCase()
      : true;

    const matchesSearchTerm =
      vehicle.Name?.toLowerCase().includes(searchValue) ||
      vehicle.Model?.toLowerCase().includes(searchValue) ||
      vehicle.Type?.toLowerCase().includes(searchValue) ||
      vehicle.Manufacturer?.toLowerCase().includes(searchValue) ||
      vehicle.Seating?.toString().includes(searchTerm);

    return matchesCategory && matchesSearchTerm;
  });

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setSorter({
      field: sorter.field,
      order: sorter.order,
    });
  };

  const columns: ColumnsType<Vehicle> = [
    {
      title: (
        <Tooltip title="Vehicle Name">
          Name <InfoCircleOutlined />
        </Tooltip>
      ),
      dataIndex: "Name",
      key: "Name",
      sorter: (a: Vehicle, b: Vehicle) => a.Name.localeCompare(b.Name),
      sortOrder: sorter?.field === "Name" ? sorter.order : null,
    },
    {
      title: (
        <Tooltip title="Model">
          Model <InfoCircleOutlined />
        </Tooltip>
      ),
      dataIndex: "Model",
      key: "Model",
      sorter: (a: Vehicle, b: Vehicle) => a.Model.localeCompare(b.Model),
      sortOrder: sorter?.field === "Model" ? sorter.order : null,
    },
    {
      title: (
        <Tooltip title="Type">
          Type <InfoCircleOutlined />
        </Tooltip>
      ),
      dataIndex: "Type",
      key: "Type",
      sorter: (a: Vehicle, b: Vehicle) => a.Type.localeCompare(b.Type),
      sortOrder: sorter?.field === "Type" ? sorter.order : null,
    },
    {
      title: (
        <Tooltip title="Manufacturer">
          Manufacturer <InfoCircleOutlined />
        </Tooltip>
      ),
      dataIndex: "Manufacturer",
      key: "Manufacturer",
      sorter: (a: Vehicle, b: Vehicle) =>
        a.Manufacturer.localeCompare(b.Manufacturer),
      sortOrder: sorter?.field === "Manufacturer" ? sorter.order : null,
    },
    {
      title: (
        <Tooltip title="Manufacturing Date">
          Manufacturing Date <InfoCircleOutlined />
        </Tooltip>
      ),
      dataIndex: "Manufacturing Date",
      key: "ManufacturingDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: Vehicle, b: Vehicle) =>
        new Date(a["Manufacturing Date"]).getTime() -
        new Date(b["Manufacturing Date"]).getTime(),
      sortOrder: sorter?.field === "Manufacturing Date" ? sorter.order : null,
    },
    {
      title: <Tooltip title="Seating">Seating</Tooltip>,
      dataIndex: "Seating",
      key: "Seating",
      sorter: (a: Vehicle, b: Vehicle) => a.Seating - b.Seating,
      sortOrder: sorter?.field === "Seating" ? sorter.order : null,
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={clearFilters}>Clear Values</Button>
      </Menu.Item>
    </Menu>
  );





  return (
    <div className="p-4">
      {loading ? (
        <Shimmer />
      ) : (
        <div>
          <div className="w-[650px] lg:w-full gap-2 flex duration-150 ">
            <div>
              <Select
                value={category}
                onChange={(value) => setCategory(value)}
                className="mb-4 w-20 "
                placeholder="Select Category"
              >
                <Select.Option value="All">All</Select.Option>
                <Select.Option value="Name">Name</Select.Option>
                <Select.Option value="Model">Model</Select.Option>
                <Select.Option value="Type">Type</Select.Option>
                <Select.Option value="Manufacturer">Manufacturer</Select.Option>
              </Select>
            </div>

            <div>
              {category && category !== "All" && (
                <Select
                  value={selectedSpecificCategory || "Select specific Category"}
                  onChange={(value) => setSelectedSpecificCategory(value)}
                  className="mb-4 bg-slate-200 w-full"
                  placeholder={`Select ${category}`}
                >
                  {specificCategory?.map((option, index) => (
                    <Select.Option key={index} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </div>

            <div>
              <Input
                placeholder={`Search across all fields`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 bg-slate-200 w-full"
              />
            </div>

            <div>
              <Dropdown overlay={menu}>
                <Button className="mb-4">
                  Actions <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="Name"
            className="rounded-md p-2 mx-2"
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default VehicleTable;
