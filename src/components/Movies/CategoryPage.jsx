import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

const CategoryPage = () => {
    const { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Category</h2>
      <ul>
          <li> <Link to={`${path}/comedy`}>Comedy</Link></li>
          <li> <Link to={`${path}/drama`}>Drama</Link></li>
      </ul>
    </div>
  );
};

export default CategoryPage;