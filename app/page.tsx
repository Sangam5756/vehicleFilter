"use client";
import React, { useState, useEffect } from "react";
import { Table, Input, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import Shimmer from "./components/Shimmer";
import type { RootState } from "./store";
import { setData, setLoading } from "./store/vehicleSlice";
import { useDispatch, useSelector } from "react-redux";
import type { Vehicle } from "./constants/TypesVehicle";


const VehicleTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: RootState) => state.vehicle);
  
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<String>("");
  const [selectedSpecificCategory, setSelectedSpecificCategory] =useState<string>("");
  const [specificCategory, setSpecificCategory] = useState<string[]>([]);


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

    if(category){
      setSelectedSpecificCategory("")
    }

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
    // @ts-ignore
    const matchesCategory = selectedSpecificCategory? vehicle[category]?.toLowerCase() === selectedSpecificCategory?.toLowerCase(): true;

    // Search input should check all fields
    const matchesSearchTerm =
      vehicle.Name?.toLowerCase().includes(searchValue) ||
      vehicle.Model?.toLowerCase().includes(searchValue) ||
      vehicle.Type?.toLowerCase().includes(searchValue) ||
      vehicle.Manufacturer?.toLowerCase().includes(searchValue) ||
      vehicle.Seating?.toString().includes(searchTerm);

    return matchesCategory && matchesSearchTerm;
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
      dataIndex: "ManufacturingDate",
      key: "ManufacturingDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Seating",
      dataIndex: "Seating",
      key: "Seating",
    },
  ];


  return (
    <div className="p-4">
      {loading ? (
        <Shimmer />
      ) : (
        <div>
    
          <Select
            value={category}
            onChange={(value) => (
              setCategory(value)
              
            )}
            className="mb-4 w-full"
            placeholder="Select Category"
          >
            <Select.Option value="All">All</Select.Option>
            <Select.Option value="Name">Name</Select.Option>
            <Select.Option value="Model">Model</Select.Option>
            <Select.Option value="Type">Type</Select.Option>
            <Select.Option value="Manufacturer">Manufacturer</Select.Option>
          </Select>

       
          {category && category!=="All" && (
            <Select
              value={selectedSpecificCategory}
              onChange={(value) => setSelectedSpecificCategory(value)}
              className="mb-4 w-full"
              placeholder={`Select ${category}`}
            >
              {specificCategory.map((option, index) => (
                <Select.Option key={index} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          )}

          
          <Input
            placeholder={`Search across all fields`}
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
      )}
    </div>
  );
};

export default VehicleTable;
