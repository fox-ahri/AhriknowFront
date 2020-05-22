export default [
  {
    path: "auth",
    name: "dbms-auth",
    component: () => import("../views/DBMS/Auth.vue"),
  },
  {
    path: "mysql",
    name: "dbms-mysql",
    component: () => import("../views/DBMS/Mysql.vue"),
  },
];
