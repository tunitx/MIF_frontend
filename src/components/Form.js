import React from "react";

const Form = () => {
  return (
    <div>
      <form
        method="post"
        encType="multipart/form-data"
        action="http://localhost:3000/press/new"
      >
        <input type="file" accept="image/*" id="image" name="image" />

        <input type="date" id="date" name="date" placeholder="date" />

        {/* <select name="month" placeholder="month">
          <option value="january">January</option>
          <option value={"february"}>February</option>
          <option value={"march"}>March</option>
          <option value={"april"}>April</option>
          <option value={"may"}>May</option>
          <option value={"june"}>June</option>
          <option value={"july"}>July</option>
          <option value={"august"}>August</option>
          <option value={"september"}>September</option>
          <option value={"october"}>October</option>
          <option value={"november"}>November</option>
          <option value={"december"}>December</option>
        </select> */}
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default Form;
