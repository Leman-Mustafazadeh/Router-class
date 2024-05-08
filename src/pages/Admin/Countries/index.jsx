import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import { useOutletContext } from "react-router";
import { deleteOne } from "../../../API";
import { Link } from "react-router-dom";
import { endpoints } from "../../../API/base";
const { Column, ColumnGroup } = Table;

const Countries = () => {
  let [countries, setCountries] = useOutletContext()
  let [filteredCountries, setFilteredCountries] = useState(countries)
  // filteredCountries = filteredCountries.length != 0 ? filteredCountries : countries;

  const handleSearch = (inputVal) => {
    const filtered = countries.filter((x) => x.name.toLowerCase().trim().includes(inputVal.toLowerCase().trim()))
    setFilteredCountries(filtered)
  }
  

  useEffect(()=>{
    setFilteredCountries(countries)
  }, [countries])

  /* delete function */
  const adminDel = (id) => {
    deleteOne(endpoints.countries, id)
    const del = countries.filter((x) => x.id != id)
    setCountries(del)
  }


  const sortByName = (value) => {
    console.log(value);
    let sortedCountries = [...filteredCountries];
    if (value === 'a') {
      sortedCountries.sort((a, z) => a.name.localeCompare(z.name));
    } else if (value === 'z') {
      sortedCountries.sort((a, z) => z.name.localeCompare(a.name));
    }
    setFilteredCountries(sortedCountries);
  };
  return (
    <>
      <input type="text" placeholder='Search name...' style={{ width: 300, height: 30, marginRight: 30 }} onChange={((e) => handleSearch(e.target.value))} />

      <select name="" id="" style={{ width: 200, height: 30 }} onChange={(e) => sortByName(e.target.value)}>
        <option value="a">A-Z</option>
        <option value="z">Z-A</option>
      </select>

      <Table dataSource={filteredCountries}>
        <ColumnGroup title="Name">
          <Column title=" name" dataIndex="name" key="name" />
          <Column title="population" dataIndex="population" key="population" />
        </ColumnGroup>
        <Column title="capital" dataIndex="capital" key="capital" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button onClick={() => adminDel(record.id)}>Delete</Button>
              <Link to={"/admin/countrydetail/" + record.id} >Detail</Link>
              <Button onClick={() => {

              }}>Edit</Button>
            </Space>
          )}
        />
      </Table>

    </>
  );
};

export default Countries;
