import React from "react";

export default function Ingredient({ name, amount }) {
  return (
    <div style={{ marginLeft: "10px", marginBottom: "25px" }}>
      <label> Name: </label>
      <span style={{ fontWeight: "lighter" }}> {name}</span>
      <br />
      <label> Amount: </label>
      <span style={{ fontWeight: "lighter" }}> {amount}</span>
    </div>
  );
}
