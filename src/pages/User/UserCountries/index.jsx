import React, { useEffect, useState } from "react";
import { deleteOne, getAll } from "../../../API/";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router";
import { endpoints } from "../../../API/base";
const UserCountries = () => {
  let [country, setCountry] = useState([]);
  let [search, setSearch] = useState([]);

  useEffect(() => {
    getAll(endpoints.countries).then((res) => {
      setCountry(res.data);
    });
  }, []);
  console.log(country);
  const userSearch = (inpvalue) => {
    const filtsearch = country.filter((x) => x.name.toLowerCase().trim().includes(inpvalue.toLowerCase().trim()));
    setSearch(filtsearch)
  };
  console.log(search);

  search = search.length !=0? search : country

  const sortByName = (value) => {
    let sortedCountries = [...country];
    if (value === "a") {
      sortedCountries.sort((a, z) => a.name.localeCompare(z.name));
    } else if (value === "z") {
      sortedCountries.sort((a, z) => z.name.localeCompare(a.name));
    }
    setCountry(sortedCountries);
  };

  const deleteFunc = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const del = country.filter((x) => x.id != id);
        deleteOne(endpoints.countries,id);
        setCountry(del);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search name..."
        style={{ width: 300, height: 30, marginRight: 30 }}
        onChange={(e) => userSearch(e.target.value)}
      />

      <select
        name=""
        id=""
        style={{ width: 200, height: 30 }}
        onChange={(e) => sortByName(e.target.value)}
      >
        <option value="a">A-Z</option>
        <option value="z">Z-A</option>
      </select>
      {search.map((el, idx) => {
        return (
          <>
            <div key={idx} style={{ display: "flex", gap: 20, marginTop: 20 }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={el.flagImg}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {el.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => deleteFunc(el.id)}>Delete</Button>
                  <Button>Edit </Button>
                  <Button>
                    <Link to={"/usercountrydetail/" + el.id}>Detail</Link>{" "}
                  </Button>
                </CardActions>
              </Card>
            </div>
          </>
        );
      })}
    </>
  );
};

export default UserCountries;
