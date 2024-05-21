import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

// Navlink in Link'ten farkı bir classsname probu alabiliyor. Bu fonksiyon yardımıyla css stilini değiştirebiliyor.
function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              // Varsayılan olarak, bir NavLink, belirtilen to değeri ile URL'in başı eşleştiğinde aktif kabul edilir. Yani, belirtilen to değeri URL'in herhangi bir kısmıyla eşleştiğinde NavLink aktif olur. end özelliği kullanıldığında, NavLink'in aktif kabul edilmesi için URL'in tam olarak eşleşmesi gerekir.
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
