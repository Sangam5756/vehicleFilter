"use client";
import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import Shimmer from "./components/Shimmer";
import type { RootState } from "./store";
import { setData, setLoading } from "./store/vehicleSlice";
import { useDispatch, useSelector } from "react-redux";
import type { Vehicle } from './constants/TypesVehicle';




const VehicleTable: React.FC = () => {

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: RootState) => state.vehicle);

  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const filteredData = data.filter((vehicle: Vehicle) => {
    return (
      vehicle.Name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      vehicle.Model?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      vehicle.Type?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      vehicle.Manufacturer?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      vehicle.ManufacturingDate?.toLowerCase().includes(
        searchTerm?.toLowerCase()
      ) ||
      vehicle.Seating?.toString().includes(searchTerm) // No need to lower case seating since it's numeric
    );
  });

  const columns: ColumnsType<Vehicle> = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Model",
      dataIndex: "Model",
      key: "Model",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Manufacturer",
      dataIndex: "Manufacturer",
      key: "Manufacturer",
    },
    {
      title: "Manufacturing Date",
      dataIndex: "Manufacturing Date",
      key: "ManufacturingDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Seating",
      dataIndex: "Seating",
      key: "Seating",
    },
  ];

  if (loading) return <Shimmer />;

  return (
    <div className="p-4">
      {
        loading ? <Shimmer/> :(

       
      <div>
        <Input
          placeholder="Search vehicles"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-full"
        />

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="Name"
          className="border border-gray-200  rounded-md p-2 mx-2"
        />
      </div>
       )
      }
    </div>
  );
};

export default VehicleTable;
