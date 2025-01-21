import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BoxTable = () => {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/boxes")
      .then((res) => res.json())
      .then((data) => setBoxes(data));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Box Name</TableCell>
            <TableCell>Products</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {boxes.map((box) => (
            <TableRow key={box.id}>
              <TableCell>{box.id}</TableCell>
              <TableCell>{box.name}</TableCell>
              <TableCell>{box.product_ids}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BoxTable;
