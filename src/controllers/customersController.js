const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM productos", (err, customers) => {
      res.render("customers", {
        data: customers,
      });
    });
  });
};
controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query("INSERT INTO productos set ?", [data], (err, rows) => {
      res.redirect("/");
    });
  });
};
controller.edit = (req, res) => {
  const { id_producto } = req.params;
  req.getConnection((err, conn) => {
    conn.query(
      `SELECT * FROM productos WHERE id_producto = ${id_producto}`,
      (err, customers) => {
        res.render("customer_edit", {
          data: customers[0],
        });
      }
    );
  });
};
controller.saveUpdate = (req, res) => {
  const { id_producto } = req.params;
  const newData = req.body;

  req.getConnection((err, conn) => {
    conn.query(
      "UPDATE productos set ? WHERE id_producto = ?",
      [newData, id_producto],
      (err, rows) => {
        res.redirect("/");
      }
    );
  });
};
controller.delete = (req, res) => {
  const { id_producto } = req.params;
  req.getConnection((err, conn) => {
    conn.query(
      "DELETE FROM productos WHERE id_producto = ?",
      [id_producto],
      (err, rows) => {
        res.redirect("/");
      }
    );
  });
};
controller.ubication = (req, res) => {
  res.render("ubication");
};
controller.multimedia = (req, res) => {
  res.render("multimedia");
};
controller.uploadImages = (req, res) => {
  res.render("indexedDB");
};
module.exports = controller;
