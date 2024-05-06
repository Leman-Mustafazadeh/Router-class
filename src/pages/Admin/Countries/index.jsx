import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import { useOutletContext } from "react-router";
import { deleteOne } from "../../../API";
import { Link } from "react-router-dom";
const { Column, ColumnGroup } = Table;

const Countries = () => {
  let [country, setCountry] = useOutletContext([])
  let [filterCount, setFilterCount] = useState([])
  const Search = (inputVal) => {
    const searchFilter = country.filter((x) => x.name.toLowerCase().trim().includes(inputVal.toLowerCase().trim()))
    setFilterCount(searchFilter)
  }
  filterCount = filterCount.length != 0 ? filterCount : country;


  /* delete function */
  const adminDel = (id) => {
    deleteOne(id)
    const del = country.filter((x) => x.id != id)
    setCountry(del)
  }


  const sortByName = (value) => {
    let sortedCountries = [...country];
    if (value === 'a') {
      sortedCountries.sort((a, z) => a.name.localeCompare(z.name));
    } else if (value === 'z') {
      sortedCountries.sort((a, z) => z.name.localeCompare(a.name));
    }
    setCountry(sortedCountries);
  };
  return (
    <>
      <input type="text" placeholder='Search name...' style={{ width: 300, height: 30, marginRight: 30 }} onChange={((e) => Search(e.target.value))} />

      <select name="" id="" style={{ width: 200, height: 30 }} onChange={(e) => sortByName(e.target.value)}>
        <option value="a">A-Z</option>
        <option value="z">Z-A</option>
      </select>
      {
        <Table dataSource={filterCount}>
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
              </Space>
            )}
          />
        </Table>
      }
    </>
  );
};

export default Countries;
